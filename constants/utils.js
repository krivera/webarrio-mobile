import React from 'react';
import { Ionicons } from '@expo/vector-icons';
export const Months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
export const MonthsFull = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

const ICON_SIZE = 25;

export const ExpenseDetails = [
  {
    key: 'electricity',
    label: 'LUZ',
    icon: (<Ionicons size={ICON_SIZE} name= 'ios-bulb-outline' />),
  },
  {
    key: 'water',
    label: 'AGUA',
    icon: (<Ionicons size={ICON_SIZE} name= 'ios-water-outline' />),
  },
  {
    key: 'gas',
    label: 'GAS',
    icon: (<Ionicons size={ICON_SIZE} name="ios-flame-outline" color="black" />),
  },
  {
    key: 'staff',
    label: 'PERSONAL',
    icon: (<Ionicons size={ICON_SIZE} name="ios-people-outline" />),
  },
  {
    key: 'extras',
    label: 'OTROS',
    icon: (<Ionicons size={ICON_SIZE} name="ios-add-circle-outline" />),
  },
]
