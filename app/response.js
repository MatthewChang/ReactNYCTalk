const response = [
  {
    id: '1',
    title: 'My first post!',
    author: {
      id: '123',
      name: 'Paul'
    },
    comments: [
      {
        id: '249',
        content: 'Nice post!',
        user: {
          id: '245',
          name: 'Jane'
        }
      },
      {
        id: '250',
        content: 'Thanks!',
        user: {
          id: '123',
          name: 'Paul'
        }
      }
    ]
  },
  {
    id: '2',
    title: 'This other post',
    author: {
      id: '123',
      name: 'Paul'
    },
    comments: [
      {
        id: '250',
        content: 'Thanks!',
        user: {
          id: '123',
          name: 'Paul'
        }
      },
      {
        id: '251',
        content: 'Your other post was nicer',
        user: {
          id: '245',
          name: 'Jane'
        }
      },
      {
        id: '252',
        content: 'I am a spammer!',
        user: {
          id: '246',
          name: 'Spambot5000'
        }
      },
      {
        id: '259',
        content: 'I hate all these spambots',
        user: {
          id: '246',
          name: 'Jane'
        }
      }
    ]
  }
]
export default response
