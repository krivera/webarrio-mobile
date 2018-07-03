import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View
} from 'react-native';
import Axios from 'axios'

const PAGE_SIZE = 15;

export default class RefreshingList extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      loading: false,
      refreshing: false,
      endReached: false,
      data: []
    };
  }

  componentWillMount = () => {
    this.loadMore();
  }

  loadMore = () => {
    const { endReached, loading, data, refreshing } = this.state;
    if(endReached || loading) return;
    this.setState(
      {loading: true},
      () => {
        const { url, authorization, dataName } = this.props;
        const page = refreshing ? 1 : Math.floor(data.length / PAGE_SIZE) + 1;
        Axios.get(
          `${url}?page=${page}`,
          {
            headers: {
              Authorization: authorization
            }
          }
        ).then(response => {
          this.setState({
            data: this.state.refreshing ? response.data[dataName] : this.state.data.concat(response.data[dataName]),
            endReached: response.data[dataName].length < PAGE_SIZE,
            refreshing: false,
            loading: false
          })
        })
    })
  }

  onRefresh = () => {
    this.setState({
      endReached: false,
      refreshing: true
    }, this.loadMore)
  }

  loading = () => {
    return (
      <View>
        {!this.state.endReached && (
          <ActivityIndicator />
        )}
      </View>
    );
  }

  render(){
    const { renderItem } = this.props;
    const { data } = this.state;
    return (
      <FlatList
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
        data={data}
        onEndReached={this.loadMore}
        onEndReachedThreshold={0.2}
        renderItem={renderItem}
        ListFooterComponent={this.loading}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
}
