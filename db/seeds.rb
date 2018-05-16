# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

arctic_monkeys = Artist.create(name: 'Arctic Monkeys')
radiohead = Artist.create(name: 'Radiohead')
arctic_monkeys.albums.create(title: 'AM', condition: :excellent, year: 2013)
radiohead.albums.create(title: 'In Rainbows', year: 2007)
