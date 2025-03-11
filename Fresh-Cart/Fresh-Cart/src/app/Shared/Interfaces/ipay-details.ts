export interface Root {
    shippingAddress: ShippingAddress
  }
  
  export interface ShippingAddress {
    details: string
    phone: string
    city: string
  }
  