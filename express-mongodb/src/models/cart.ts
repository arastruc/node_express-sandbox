import CartItem from "./product-item";

class Cart {
  totalPrice!: number;
  items!: Array<CartItem>;

  constructor(items: Array<CartItem>) {
    this.items = items;
    this.totalPrice = items.reduce(
      (accumulator, { quantity, product_price }) =>
        accumulator + quantity * product_price,
      0
    );
  }
}
export default Cart;
