import consumer from "./consumer"

// given the nesting, capturing this resolves access problems.
const ratingChannel = consumer.subscriptions.create({ channel: "RatingChannel"},
{
  initialized() {
    this.installOnAllItems();
  },

  received(data) {
    if (data['command'] == 'replace') {
      this.replaceItem(data);
    } else {
      // leave room for other commands, but for now just choke
      console.log("UNKNOWN COMMAND: " + data['command']);
    }
  },

  replaceItem(data) {
    // replace the contents of the container
    const item = document.getElementById("item_" + data['item_id'])
    item.innerHTML = data['html'];
    ratingChannel.installOnItem(item);
  },

  incrementItem() {
    ratingChannel.perform('inc_rating', {'item_id': this.dataset.itemId});
  },

  decrementItem() {
    ratingChannel.perform('dec_rating', {'item_id': this.dataset.itemId});
  },

  installOnAllItems() {
    document.addEventListener("DOMContentLoaded", (event) => {
      const items = Array.from(document.getElementsByClassName('item-row'));
      items.forEach(item => {
        this.installOnItem(item);
      });
    });  
  },

  installOnItem(item) {
    // <button class="item-increment" ...>
    let incButton = item.getElementsByClassName('item-increment')[0];
    let decButton = item.getElementsByClassName('item-decrement')[0];

    incButton.addEventListener('click', this.incrementItem);
    decButton.addEventListener('click', this.decrementItem);
  }
});
