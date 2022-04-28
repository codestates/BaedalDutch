const { parties, users_parties } = require("../models");
const { isAuthorized } = require("./tokenfunctions");

module.exports = {
  participateParty: async (req, res) => {
    // 파티에 참가
    const userInfo = isAuthorized(req);
    console.log("userinfo-------", userInfo);
    if (!userInfo) {
      res.status(404).send({
        message: "Bad request update parties",
      });
    }
    try {
      users_parties.create({ users_id: userInfo.id, parties_id: req.params.id });
      res.status(201).send({message: "success participate parties"})
    } catch (err) {
      res.end();
    }
  },
  cancelOrder: async (req, res) => {
    // 파티에서 탈퇴
    res.end();
  },
};
