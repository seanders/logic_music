# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

logic = Artist.create(name: 'Logic')
radiohead = Artist.create(name: 'radiohead')
logic.albums.create(title: 'Bobby Taratino II', condition: :excellent, year: 2018)
radiohead.albums.create(title: 'In Rainbows')
radiohead.albums.create(title: 'OK Computer')
