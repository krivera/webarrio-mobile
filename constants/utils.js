import React from 'react'
export const Months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
  'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
export const MonthsFull = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export const ExpenseDetails = [
  {
    key: 'electricity',
    label: 'Luz',
    icon: 'ios-bulb-outline'
  },
  {
    key: 'water',
    label: 'Agua',
    icon: 'ios-water-outline'
  },
  {
    key: 'gas',
    label: 'Gas',
    icon: 'ios-flame-outline'
  },
  {
    key: 'staff',
    label: 'Personal',
    icon: 'ios-people-outline'
  },
  {
    key: 'extras',
    label: 'Otros',
    icon: 'ios-add-circle-outline'
  }
]

export const PaymentMethodTypes = {
  bank_transfer: {
    label: 'Transferencia Bancaria',
    attrs: [
      { key: 'rut', label: 'RUT' },
      { key: 'bank', label: 'Banco' },
      { key: 'account_type', label: 'Tipo de cuenta' },
      { key: 'account_number', label: 'Número de cuenta' },
      { key: 'email', label: 'Mail' }
    ]
  },
  cash: {
    label: 'Efectivo',
    attrs: [
      { key: 'address', label: 'Dirección' }
    ]
  }
}
