class Checkout {
  constructor(rules = []) {
    this.cartItems = [];
    this.rules = rules; // rule schema: { type: String['quantity', 'total'], adjustment: Integer, threshold: Integer, itemIdentifier: String[optional] }
  }

  scan(item) {
    // add or update item reference

    let itemReference = this.cartItems.find(cartItem => cartItem.identifier === item.identifier);
    if (itemReference !== undefined) {
      itemReference.quantity += 1;
    } else {
      this.cartItems.push({ identifier: item.identifier, price: item.price, quantity: 1 });
    }
  }

  total() {
    let total = 0;

    // fetch item and cart promotions
    let quantityRules = this.rules.filter(rule => rule.type === 'quantity');
    let cartTotalRules = this.rules.filter(rule => rule.type ==='total');

    // Apply rule adjustments for matching items, if conditions fulfilled (quantity threshold)
    this.cartItems.forEach(item => {
      if (quantityRules.length === 0) {
        total += item.price * item.quantity;
      } else {
        let matchingRules = quantityRules.filter(rule => rule.itemIdentifier === item.identifier);
        if (matchingRules.length === 0) {
          total += item.price * item.quantity;
        } else {
          matchingRules.forEach(rule => {
            if (item.quantity >= rule.threshold) {
              total += (item.price * item.quantity) - rule.adjustment;
            } else {
              total += item.price * item.quantity;
            }
          });
        }
      }
    });

    // Apply cart total rules after quantity rules
    if (cartTotalRules.length > 0) {
      cartTotalRules.forEach(promotion => {
        if (total >= promotion.threshold) {
          total -= promotion.adjustment;
        }
      })
    }

    return total;
  }
}

module.exports = Checkout;