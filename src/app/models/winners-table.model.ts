
import { JackpotSlotTable } from './jackpot-slot-table.model';

export class WinnersTable {

    randomNum: number;                          //номер случайно выбранного игрока из списка играющих игроков(playerLocations);
    playerLocation: JackpotSlotTable;           //случайно выбранный игрок и информация о нем;
    playerLocations: JackpotSlotTable[];        //список играющих игроков с указанием порядкого номера;
    currentDate: string;                        //дата вставки записи в БД;
    playerImage: string;                        //изображение игрока.

}
