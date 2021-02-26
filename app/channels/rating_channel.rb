class RatingChannel < ApplicationCable::Channel
  def subscribed
    # this isn't tied to a model or the user. it is 
    # a universal broadcast
    stream_from "rating"
  end

  def receive(data)
    ActionCable.server.broadcast("rating", data)
  end

  def inc_rating(data)
    broadcast_item(Item.find_by_id(data['item_id']).increment!(:rating))
  end

  def dec_rating(data)
    broadcast_item(Item.find_by_id(data['item_id']).decrement!(:rating))
  end

  private

  def broadcast_item(item)
    html = ApplicationController
            .renderer
            .render_to_string(partial: 'items/item_template',
                              locals: { item: item })
    ActionCable.server.broadcast("rating", {html: html, item_id: item.id, command: "replace"})
  end
end