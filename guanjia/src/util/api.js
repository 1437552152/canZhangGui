/*
 * @Description: 
 * @Author: yfye
 * @Date: 2020-09-26 18:47:27
 * @LastEditTime: 2020-09-26 19:00:17
 * @LastEditors: yfye
 */
import { get, post } from "./request";
export const login = p => post("login", p);
