import { MockArticleRepository } from '../../repositories/ArticleRepository/';

const articleRepository = new MockArticleRepository()

const resolvers = {
  Query: {
    getPage(obj, args, context, info) {
      return {
        type: 'type_article',
        template: 'std_article',
        title: 'article  title',
        coverImage: {
          uuid: 'dsdsdsds',
          url: 'http://fdfdf/.',
          width: '100',
          height: '120'
        }
      }
    },
    async articles(obj, args, context, info) {
      // console.log(obj)
      // console.log(args.articleQuery)
      // console.log(context)
      // console.log(info)

      // Get articles from repository
      // mutate articles -> amp, segmentation etc
      // create response structure

      return await articleRepository.getByCategory(null);
    }
  },
  IPage: {
    __resolveType(args) {
      switch (args.type) {
        case 'type_article':
          return 'Article'
          break;
      
        default:
          break;
      }
      console.log(args)
      return 'BasicPageContent';
    }
  },
  AuthorContent: {
    __resolveType() {
      return null;
    }
  },
  PageContent: {
    __resolveType() {
      return null;
    }
  },
  // Mutation: {
    // upvotePost(_, { postId }) {
    //   return {};
    // },
  // },
  Author: {
    // posts(author) {
    //   return {};
    // },
  },
};

export default resolvers;
