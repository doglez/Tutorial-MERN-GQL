import Book from "../models/Book";

const resolvers = {
    Query: {
        hello: (_parent: any, args: { name: string }) => `Hello ${args.name}`,
        books: async () => await Book.find({}),
        book: async (_parent: any, args: { id: number }) =>
            await Book.findById(args.id),
    },
    Mutation: {
        create: async (_parent: any, args: { title: string; year: number }) => {
            const book = await Book.create({
                title: args.title,
                year: args.year,
            });

            return book;
        },
        update: async (
            _parent: any,
            args: { id: number; title: string; year: number }
        ) => {
            let book = await Book.findById(args.id);

            if (!book) {
                return null;
            }

            book = await Book.findByIdAndUpdate(
                args.id,
                {
                    title: args.title,
                    year: args.year,
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            return book;
        },
        delete: async (_parent: any, args: { id: number }) => {
            const book = await Book.findById(args.id);

            if (!book) {
                return null;
            }

            await book?.remove();

            return book;
        },
    },
};

export default resolvers;
