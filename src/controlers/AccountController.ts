import { NextFunction, Request, Response } from 'express';
import {
  AccountModel,
  UserModel,
} from '../frameworks/persistence/models';
var jwt = require('jsonwebtoken');

class AccountController {
  public async getAccount(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    try {
      let user = await UserModel.findOne({
        where: { id: req.userId },
      });
      let account = await AccountModel.findByPk(user.accountId);

      const answer = {
        account: account.id,
        balance: account.balance,
      };
      res.send(answer);
      return;
    } catch (error) {
      const answer = 'Falha ao renderizar Account! Tente novamente';
      res.status(400).send(answer);
      return;
    }
  }
}
export default new AccountController();
