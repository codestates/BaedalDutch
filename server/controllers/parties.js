const { parties } = require("../models");
const { isAuthorized } = require("./tokenfunctions");

module.exports = {
  // 전체 파티 조회
  getAllParties: async (req, res) => {
    console.log("getAllParties 진입");
    // 1. closed가 false인 파티만 찾는다.
    const allParty = await parties.findAll({ where: { closed: false } });
    console.log("allParty:", allParty);
    // 2. 파티가 없는 경우
    if (!allParty)
      res.status(404).json({
        message: "Bad request get parties",
      });
    try {
      // 3. 파티가 있다면 응답!
      res.status(200).json({ data: allParty, message: "success get parties info parties" });
    } catch (err) {
      // 4. 에러 처리
      res.status(500).json({
        message: "Server Error get parties",
      });
    }
  },

  // 파티 하나 조회 ( 미완성 )
  getOneParty: async (req, res) => {
    console.log("getOneParty 진입");
    // 1. closed가 false인 파티만 찾는다.
    console.log("req.params.id:", req.parmas.id);
    const oneParty = await parties.findOne({
      where: {
        id: req.parmas.id,
        closed: false,
      },
    });
    console.log("oneParty:", oneParty);
    // 2. 파티가 없는 경우
    if (!oneParty)
      res.status(404).json({
        message: "Bad request get parties",
      });
    try {
      // 3. 파티가 있다면 응답!
      res.status(200).json({ data: oneParty, message: "success get parties info parties" });
    } catch (err) {
      // 4. 에러 처리
      res.status(500).json({
        message: "Server Error get parties",
      });
    }
  },

  // 파티 생성
  createParty: async (req, res) => {
    console.log("createParty 진입");
    // 1. 유저가 토큰을 가지고 있는지 검증
    const userInfo = isAuthorized(req);
    console.log("userInfo:", userInfo);
    // 2. 유저가 토큰을 가지고 있지 않는 경우
    if (!userInfo) {
      res.status(404).json({
        message: "token none",
      });
    }
    // 3. req.body가 제대로 들어왔는지 확인
    const { store_name, food_category, content, fee, address } = req.body;
    console.log("req.body:", req.body);
    try {
      // 4. body가 잘 들어왔다면 (토큰을 가진 유저의 id + req.body)를 담아서 DB에 저장(parties, users_parties)
      const partyInfo = await parties.create({
        writerUser_id: userInfo.id,
        store_name: store_name,
        food_category: food_category,
        content: content,
        fee: fee,
        address: address,
        closed: false,
      });

      res.status(201).json({
        // data: store_name (로직 성공확인되면 이걸로 바꾸기)
        data: partyInfo,
        message: "create party post parties",
      });
    } catch (err) {
      res.status(500).json({
        message: "Server Error post parties",
      });
    }
  },

  // 파티 삭제
  deleteParty: async (req, res) => {
    console.log("deleteParty 진입");
    // 1. 유저가 토큰을 가지고 있는지 검증
    const userInfo = isAuthorized(req);
    console.log("userInfo:", userInfo);
    // 2. 유저가 토큰을 가지고 있지 않는 경우
    if (!userInfo) {
      res.status(404).json({
        message: "token none",
      });
    }
    try {
      // 3. req.parmas.id DB에서 확인하고 삭제
      console.log("req.params.id", req.params.id);
      const doDeleteParty = await parties.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({
        message: "delete party delete parties",
      });
    } catch (err) {
      res.status(500).json({
        message: "Server Error delete parties",
      });
    }
  },

  // 파티 수정
  updateParty: async (req, res) => {
    console.log("updateParty 진입");
    // 1. 유저가 토큰을 가지고 있는지 검증
    const userInfo = isAuthorized(req);
    console.log("userInfo:", userInfo);
    // 2. 유저가 토큰을 가지고 있지 않는 경우
    if (!userInfo) {
      res.status(404).json({
        message: "token none",
      });
    }
    // 3. req.body가 제대로 들어왔는지 확인
    const { store_name, food_category, content, fee, address } = req.body;
    console.log("req.body:", req.body);
    try {
      console.log("req.params.id:", req.params.id);
      const partyInfo = await parties
        .update(
          // 1_ update할 칼럼의 정보
          {
            writerUser_id: userInfo.id,
            store_name: store_name,
            food_category: food_category,
            content: content,
            fee: fee,
            address: address,
            closed: false,
          },
          // where절
          {
            where: {
              id: req.params.id,
            },
          }
        )
        .then(() => {
          if (!isParty) {
            res.status(404).json({
              message: "Bad request update parties",
            });
          } else {
            res.status(200).json({
              data: partyInfo,
              message: "success update parties update parties",
            });
          }
        });
    } catch (err) {
      res.status(500).json({
        message: "Server Error update parties",
      });
    }
  },

  // 파티 closed true로 수정
  closeParty: async (req, res) => {
    console.log("closeParty 진입");
    // 1. 유저가 토큰을 가지고 있는지 검증
    const userInfo = isAuthorized(req);
    console.log("userInfo:", userInfo);
    // 2. 유저가 토큰을 가지고 있지 않는 경우
    if (!userInfo) {
      res.status(404).json({
        message: "token none",
      });
    }
    try {
      console.log("req.params.id:", req.params.id);
      const partyInfo = await parties
        .update(
          // 1_ update할 칼럼의 정보 ( closed only!!!! )
          {
            closed: true,
          },
          // where절
          {
            where: {
              id: req.params.id,
            },
          }
        )
        .then(() => {
          if (!isParty) {
            res.status(404).json({
              message: "Bad request close parties",
            });
          } else {
            res.status(200).json({
              data: partyInfo,
              message: "success close parties",
            });
          }
        });
    } catch (err) {
      res.status(500).json({
        message: "Server Error close parties",
      });
    }
  },
};
