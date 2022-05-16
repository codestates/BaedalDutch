'use strict'

const createdAt = new Date()
const updatedAt = new Date()

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          email: 'admin@test.com',
          nickname: 'admin',
          password: '1234',
          image:
            'https://baedaldutch-profile.s3.ap-northeast-2.amazonaws.com/DOM.png',
          phone_number: '010-1111-1111',
          address: '주소1',
          createdAt,
          updatedAt,
        },
        {
          id: 2,
          email: 'test@test.com',
          nickname: 'Kimcoding',
          password: '1234',
          image:
            'https://baedaldutch-profile.s3.ap-northeast-2.amazonaws.com/google.png',
          phone_number: '010-1111-1111',
          address: '주소2',
          createdAt,
          updatedAt,
        },
        {
          id: 3,
          email: 'test1@test.com',
          nickname: 'Parkhacker',
          password: '1234',
          image:
            'https://baedaldutch-profile.s3.ap-northeast-2.amazonaws.com/people.png',
          phone_number: '010-2222-2222',
          address: '주소3',
          createdAt,
          updatedAt,
        },
      ],
      {},
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  },
}
