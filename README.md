# README

The goal of this repo was to create a feedback mechanism (+/-) using
ActionCable as simply as possible, to aid in understanding the
underlying tools:

* No Stimulus, StimulusReflex, Turbo
* Just JavaScript, no help apart from what is provided by ActionCable

## Versions

This repo was made with Ruby 3.0.0 and Rails 6.1.2.1.
## Getting Started

Clone this repo, then:

`bin/rails db:create db:migrate db:seed`

You can then start the server:

`bin/rails server`

The interesting files are:

* `app/controllers/items_controller.rb`
* `app/channels/rating_channel.rb`
* `app/javascript/channels/rating_channel.js`
* `app/views/items/*`