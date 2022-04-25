const { parties, users_parties } = require("../models");
const { isAuthorized } = require("./tokenfunctions");

module.exports = {
  participateParty: async (req, res) => {
    // 파티에 참가
    const userInfo = await isAuthorized(req);
    if(!userInfo){
      res.status(404).send({
        "message": "Bad request update parties"
     })
    }
    parties.findOne({ where: { parties_id: req.params.id } });
    res.end();
  },
  cancelOrder: async (req, res) => {
    // 파티에서 탈퇴
    res.end();
  },
};
