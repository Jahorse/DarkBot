"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DUSDC = void 0;
const ethers_1 = require("ethers");
const abi_1 = require("./abi");
const token_1 = require("./token");
class DUSDC extends token_1.Token {
    constructor(props) {
        super();
        this.contractAddress = '0x029B1c559a1771a5FFBc93cb8038dde3096aDDB0';
        this.name = 'DUSDC';
        this.contract = new ethers_1.ethers.Contract(this.contractAddress, abi_1.dusdcAbi, props.provider);
    }
}
exports.DUSDC = DUSDC;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVzZGMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkdXNkYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBZ0M7QUFFaEMsK0JBQWlDO0FBQ2pDLG1DQUE0QztBQUU1QyxNQUFhLEtBQU0sU0FBUSxhQUFLO0lBTTlCLFlBQW1CLEtBQWlCO1FBQ2xDLEtBQUssRUFBRSxDQUFDO1FBTkEsb0JBQWUsR0FBRyw0Q0FBNEMsQ0FBQztRQUMvRCxTQUFJLEdBQUcsT0FBTyxDQUFDO1FBTXZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxlQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsY0FBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RixDQUFDO0NBQ0Y7QUFWRCxzQkFVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV0aGVycyB9IGZyb20gJ2V0aGVycyc7XG5cbmltcG9ydCB7IGR1c2RjQWJpIH0gZnJvbSAnLi9hYmknO1xuaW1wb3J0IHsgVG9rZW4sIFRva2VuUHJvcHMgfSBmcm9tICcuL3Rva2VuJztcblxuZXhwb3J0IGNsYXNzIERVU0RDIGV4dGVuZHMgVG9rZW4ge1xuICBwcm90ZWN0ZWQgY29udHJhY3RBZGRyZXNzID0gJzB4MDI5QjFjNTU5YTE3NzFhNUZGQmM5M2NiODAzOGRkZTMwOTZhRERCMCc7XG4gIHByb3RlY3RlZCBuYW1lID0gJ0RVU0RDJztcblxuICBwcm90ZWN0ZWQgY29udHJhY3Q6IGV0aGVycy5Db250cmFjdDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocHJvcHM6IFRva2VuUHJvcHMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY29udHJhY3QgPSBuZXcgZXRoZXJzLkNvbnRyYWN0KHRoaXMuY29udHJhY3RBZGRyZXNzLCBkdXNkY0FiaSwgcHJvcHMucHJvdmlkZXIpO1xuICB9XG59Il19