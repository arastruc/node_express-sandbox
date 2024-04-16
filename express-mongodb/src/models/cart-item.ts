class CartItem {
  product_id!: string;
  product_title!: string;
  product_price!: number;
  quantity!: number;

  constructor(
    product_id: string,
    product_title: string,
    product_price: number,
    quantity: number
  ) {
    this.product_id = product_id;
    this.product_title = product_title;
    this.product_price = product_price;
    this.quantity = quantity;
  }
}

export default CartItem;
