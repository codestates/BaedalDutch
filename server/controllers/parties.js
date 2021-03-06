const { parties, users_parties } = require('../models')
const { isAuthorized } = require('./tokenfunctions')

module.exports = {
  // 전체 파티 조회
  getAllParties: async (req, res) => {
    // 1. closed가 false인 파티만 찾는다.
    const allParty = await parties.findAll({ where: { closed: false } })
    // 2. 파티가 없는 경우
    if (!allParty)
      res.status(404).json({
        message: 'Bad request get parties',
      })
    try {
      // 3. 파티가 있다면 응답!
      res
        .status(200)
        .json({ data: allParty, message: 'success get parties info parties' })
    } catch (err) {
      // 4. 에러 처리
      res.status(500).json({
        message: 'Server Error get parties',
      })
    }
  },

  // 파티 하나 조회
  // 유저 id로 토큰 확인한 후
  // 그 파티의 leader와 토큰이 확인된 유저id랑 같은지 확인 후 구별해서 보내주기
  getOneParty: async (req, res) => {
    // 1. req.params.id와 일치하는 파티 하나를 찾는다. (+closed)
    const oneParty = await parties.findOne({
      where: {
        id: req.params.id,
        closed: false,
      },
    })
    // 2. 파티가 없는 경우
    if (!oneParty)
      return res.status(404).json({
        message: 'Bad request get parties',
      })
    // 3. 토큰을 가진 유저인지 확인
    const userInfo = isAuthorized(req)
    // 유저가 토큰을 가지고 있지 않는 경우
    if (!userInfo) {
      res.status(404).json({
        message: 'token none',
      })
    }
    const participant = await users_parties.findOne({
      where: { users_id: userInfo.id, parties_id: oneParty.id },
    })
    try {
      // 4. 토큰을 가진 유저인 경우 1-1. 유저 id와 조회한 파티의 leader가 같다면 파티(작성자)를 client에 보내주기\
      if (userInfo.id === oneParty.leader) {
        res
          .status(200)
          .json({ leader: oneParty, message: 'success get parties of leader' })
      }
      // 5. 토큰을 가진 유저인 경우 1-2. 유저 id와 조회한 파티의 leader와 다르다면 파티(참가자)를 client에 보내주기
      else if (!participant) {
        res.status(200).json({
          newbie: oneParty,
          message: 'success get parties of newbie',
        })
      } else if (participant) {
        res.status(200).json({
          participant: oneParty,
          message: 'success get parties of participant',
        })
      }
    } catch (err) {
      // 4. 에러 처리
      return res.status(500).json({
        message: 'Server Error get parties',
      })
    }
  },

  // 파티 생성
  createParty: async (req, res) => {
    // 1. 유저가 토큰을 가지고 있는지 검증


    const userInfo = isAuthorized(req)
    // 2. 유저가 토큰을 가지고 있지 않는 경우
    if (!userInfo) {
      res.status(404).json({
        message: 'token none',
      })
    }
    // 3. req.body가 제대로 들어왔는지 확인
    const {
      leader,
      store_name,
      food_category,
      member_num,
      content,
      fee,
      address,
      lat,
      lng,
    } = req.body
    try {
      // 4. body가 잘 들어왔다면 (토큰을 가진 유저의 id + req.body)를 담아서 DB에 저장(parties, users_parties)
      const partyInfo = await parties
        .create({
          leader: userInfo.id,
          store_name: store_name,
          food_category: food_category,
          member_num: member_num,
          content: content,
          fee: fee,
          address: address,
          closed: false,
          lat: lat,
          lng: lng,
        })
        .then(data => {
          res.status(201).json({
            // data: store_name (로직 성공확인되면 이걸로 바꾸기)
            data: data.dataValues,

            message: 'create party post parties',
          })
        })
    } catch (err) {
      res.status(500).json({
        message: 'Server Error post parties',
      })
    }
  },

  // 파티 삭제
  deleteParty: async (req, res) => {
    // 1. 유저가 토큰을 가지고 있는지 검증
    // const userInfo = isAuthorized(req)
    // // console.log('userInfo:', userInfo)
    // // 2. 유저가 토큰을 가지고 있지 않는 경우
    // if (!userInfo) {
    //   return res.status(404).json({
    //     message: 'token none',
    //   })
    // }
    try {
      // 3. req.params.id DB에서 확인하고 삭제
      const doDeleteParty = await parties.destroy({
        where: {
          id: req.params.id,
        },
      })
      return res.status(200).json({
        message: 'delete party delete parties',
      })
    } catch (err) {
      return res.status(500).json({
        message: 'Server Error delete parties',
      })
    }
  },

  // 파티 수정
  updateParty: async (req, res) => {
    // console.log('updateParty 진입')
    // // 1. 유저가 토큰을 가지고 있는지 검증
    // const userInfo = isAuthorized(req)
    // // console.log('userInfo:', userInfo)
    // // 2. 유저가 토큰을 가지고 있지 않는 경우
    // if (!userInfo) {
    //   return res.status(404).json({
    //     message: 'token none',
    //   })
    // }
    // 3. req.body가 제대로 들어왔는지 확인
    const { store_name, food_category, member_num, content, fee, address } =
      req.body
    try {
      // 1_ update할 칼럼의 정보
      const partyInfo = await parties.update(
        {
          store_name: store_name,
          food_category: food_category,
          member_num: member_num,
          content: content,
          fee: fee,
          address: address,
        },
        // where절
        {
          where: {
            id: req.params.id,
          },
        },
      )
      if (!partyInfo) {
        return res.status(404).json({
          message: 'Bad request update parties',
        })
      } else {
        return res.status(200).json({
          data: partyInfo,
          message: 'success update parties update parties',
        })
      }
    } catch (err) {
      return res.status(500).json({
        message: 'Server Error update parties',
      })
    }
  },

  // 파티 closed true로 수정
  closeParty: async (req, res) => {
    // 1. 유저가 토큰을 가지고 있는지 검증
    // const userInfo = isAuthorized(req)
    // console.log('userInfo:', userInfo)
    // 2. 유저가 토큰을 가지고 있지 않는 경우
    // if (!userInfo) {
    //   res.status(404).json({
    //     message: 'token none',
    //   })
    // }
    try {
      const partyInfo = await parties.update(
        // 1_ update할 칼럼의 정보 ( closed only!!!! )
        {
          closed: true,
        },
        // where절
        {
          where: {
            id: req.params.id,
          },
        },
      )
      if (!partyInfo) {
        res.status(404).json({
          message: 'Bad request close parties',
        })
      } else {
        res.status(200).json({
          message: 'success close parties',
        })
      }
    } catch (err) {
      res.status(500).json({
        message: 'Server Error close parties',
      })
    }
  },
}
