# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

logic = Artist.create(name: 'Logic')
logic.albums.create(title: 'Bobby Taratino II', condition: :excellent, year: 2018)
