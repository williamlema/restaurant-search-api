import * as request from "request-promise-native";
import { RestarurantBodyList } from "model/restaurant.model";

export const searchByCity = async (
    cityName: string
) => {

    const baseUrl = 'http://opentable.herokuapp.com/api/restaurants?city=';
    var options = {
        uri: baseUrl + cityName,
        json: true
    };
    return await request.get<RestarurantBodyList>(options);    
};