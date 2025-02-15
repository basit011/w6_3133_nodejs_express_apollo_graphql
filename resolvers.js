const Movie = require('./models/Movie');

const resolver = {
    Query: {
        movies: async () => {
           
            // const m = {
            //     id: '1',
            //     name: 'Inception',
            //     director_name: 'Christopher Nolan',
            //     production_house: 'Warner Bros.',
            //     release_date: '2010-07-16',
            //     rating: 8.8
            // }
            // return [m, m]
            return await Movie.find();
        },
        movie: async (_, { id }) => {
            return await Movie.findById(id);
        }
    },

    Mutation: {
        addMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
            const movie = new Movie({ name, director_name, production_house, release_date, rating });
            const newMovie = await movie.save();
            return newMovie
        },

         updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
            const movie = await Movie.findById(id);
            if (!movie) return null;

            if (name) movie.name = name;
            if (director_name) movie.director_name = director_name;
            if (production_house) movie.production_house = production_house;
            if (release_date) movie.release_date = release_date;
            if (rating) movie.rating = rating;

            return await movie.save();
        },

         deleteMovie: async (_, { id }) => {
            const movie = await Movie.findById(id);
            if (!movie) return null;

            await movie.remove();
            return movie;
        },
    }
}

module.exports = resolver