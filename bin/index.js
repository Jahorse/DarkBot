"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const discord_client_1 = require("../lib/discord-client");
const token_poller_1 = require("../lib/token-poller");
const dark_peg_market_1 = require("../lib/tokens/dark-peg-market");
const dcof_1 = require("../lib/tokens/dcof");
const dcro_1 = require("../lib/tokens/dcro");
const dusdc_1 = require("../lib/tokens/dusdc");
const dusdt_1 = require("../lib/tokens/dusdt");
const secrets_json_1 = __importDefault(require("../secrets.json"));
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function runMonitor() {
    const refreshRate = 10000; // ms
    const discordClient = new discord_client_1.Discord();
    const rpcUrl = 'https://evm.cronos.org/';
    const provider = new ethers_1.providers.JsonRpcProvider(rpcUrl);
    const pk = secrets_json_1.default[2];
    const wallet = new ethers_1.ethers.Wallet(pk, provider);
    const darkPegMarket = new dark_peg_market_1.DarkPegMarket({ wallet });
    new token_poller_1.TokenPoller({
        darkPegMarket,
        discordClient,
        refreshRate,
        token: new dusdc_1.DUSDC({ provider: wallet.provider }),
        comparator: token_poller_1.Comparator.greaterThan,
        watchPrice: 1.00,
    });
    new token_poller_1.TokenPoller({
        darkPegMarket,
        discordClient,
        refreshRate,
        token: new dcro_1.DCRO({ provider: wallet.provider }),
        comparator: token_poller_1.Comparator.greaterThan,
        watchPrice: 1.00,
    });
    new token_poller_1.TokenPoller({
        darkPegMarket,
        discordClient,
        refreshRate,
        token: new dcof_1.DCOF({ provider: wallet.provider }),
        comparator: token_poller_1.Comparator.greaterThan,
        watchPrice: 1.00,
    });
    new token_poller_1.TokenPoller({
        darkPegMarket,
        discordClient,
        refreshRate,
        token: new dusdt_1.DUSDT({ provider: wallet.provider }),
        comparator: token_poller_1.Comparator.greaterThan,
        watchPrice: 1.00,
    });
    while (true) {
        await sleep(2000);
    }
}
runMonitor()
    .then(() => {
    console.log('Complete');
})
    .catch(err => {
    console.error(err);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1DQUEyQztBQUUzQywwREFBZ0Q7QUFDaEQsc0RBQThEO0FBQzlELG1FQUE4RDtBQUM5RCw2Q0FBMEM7QUFDMUMsNkNBQTBDO0FBQzFDLCtDQUE0QztBQUM1QywrQ0FBNEM7QUFDNUMsbUVBQXFEO0FBRXJELFNBQVMsS0FBSyxDQUFDLEVBQVU7SUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBRUQsS0FBSyxVQUFVLFVBQVU7SUFDdkIsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsS0FBSztJQUNoQyxNQUFNLGFBQWEsR0FBRyxJQUFJLHdCQUFPLEVBQUUsQ0FBQztJQUNwQyxNQUFNLE1BQU0sR0FBRyx5QkFBeUIsQ0FBQztJQUN6QyxNQUFNLFFBQVEsR0FBRyxJQUFJLGtCQUFTLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sRUFBRSxHQUFHLHNCQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxlQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUUvQyxNQUFNLGFBQWEsR0FBRyxJQUFJLCtCQUFhLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBRXBELElBQUksMEJBQVcsQ0FBQztRQUNkLGFBQWE7UUFDYixhQUFhO1FBQ2IsV0FBVztRQUNYLEtBQUssRUFBRSxJQUFJLGFBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0MsVUFBVSxFQUFFLHlCQUFVLENBQUMsV0FBVztRQUNsQyxVQUFVLEVBQUUsSUFBSTtLQUNqQixDQUFDLENBQUM7SUFDSCxJQUFJLDBCQUFXLENBQUM7UUFDZCxhQUFhO1FBQ2IsYUFBYTtRQUNiLFdBQVc7UUFDWCxLQUFLLEVBQUUsSUFBSSxXQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlDLFVBQVUsRUFBRSx5QkFBVSxDQUFDLFdBQVc7UUFDbEMsVUFBVSxFQUFFLElBQUk7S0FDakIsQ0FBQyxDQUFDO0lBQ0gsSUFBSSwwQkFBVyxDQUFDO1FBQ2QsYUFBYTtRQUNiLGFBQWE7UUFDYixXQUFXO1FBQ1gsS0FBSyxFQUFFLElBQUksV0FBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QyxVQUFVLEVBQUUseUJBQVUsQ0FBQyxXQUFXO1FBQ2xDLFVBQVUsRUFBRSxJQUFJO0tBQ2pCLENBQUMsQ0FBQztJQUNILElBQUksMEJBQVcsQ0FBQztRQUNkLGFBQWE7UUFDYixhQUFhO1FBQ2IsV0FBVztRQUNYLEtBQUssRUFBRSxJQUFJLGFBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDL0MsVUFBVSxFQUFFLHlCQUFVLENBQUMsV0FBVztRQUNsQyxVQUFVLEVBQUUsSUFBSTtLQUNqQixDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksRUFBRTtRQUNYLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25CO0FBQ0gsQ0FBQztBQUVELFVBQVUsRUFBRTtLQUNULElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQztLQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtJQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBldGhlcnMsIHByb3ZpZGVycyB9IGZyb20gJ2V0aGVycyc7XG5cbmltcG9ydCB7IERpc2NvcmQgfSBmcm9tICcuLi9saWIvZGlzY29yZC1jbGllbnQnO1xuaW1wb3J0IHsgQ29tcGFyYXRvciwgVG9rZW5Qb2xsZXIgfSBmcm9tICcuLi9saWIvdG9rZW4tcG9sbGVyJztcbmltcG9ydCB7IERhcmtQZWdNYXJrZXQgfSBmcm9tICcuLi9saWIvdG9rZW5zL2RhcmstcGVnLW1hcmtldCc7XG5pbXBvcnQgeyBEQ09GIH0gZnJvbSAnLi4vbGliL3Rva2Vucy9kY29mJztcbmltcG9ydCB7IERDUk8gfSBmcm9tICcuLi9saWIvdG9rZW5zL2Rjcm8nO1xuaW1wb3J0IHsgRFVTREMgfSBmcm9tICcuLi9saWIvdG9rZW5zL2R1c2RjJztcbmltcG9ydCB7IERVU0RUIH0gZnJvbSAnLi4vbGliL3Rva2Vucy9kdXNkdCc7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIFNlY3JldHMgfSBmcm9tICcuLi9zZWNyZXRzLmpzb24nO1xuXG5mdW5jdGlvbiBzbGVlcChtczogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5Nb25pdG9yKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCByZWZyZXNoUmF0ZSA9IDEwMDAwOyAvLyBtc1xuICBjb25zdCBkaXNjb3JkQ2xpZW50ID0gbmV3IERpc2NvcmQoKTtcbiAgY29uc3QgcnBjVXJsID0gJ2h0dHBzOi8vZXZtLmNyb25vcy5vcmcvJztcbiAgY29uc3QgcHJvdmlkZXIgPSBuZXcgcHJvdmlkZXJzLkpzb25ScGNQcm92aWRlcihycGNVcmwpO1xuICBjb25zdCBwayA9IFNlY3JldHNbMl07XG4gIGNvbnN0IHdhbGxldCA9IG5ldyBldGhlcnMuV2FsbGV0KHBrLCBwcm92aWRlcik7XG5cbiAgY29uc3QgZGFya1BlZ01hcmtldCA9IG5ldyBEYXJrUGVnTWFya2V0KHsgd2FsbGV0IH0pO1xuXG4gIG5ldyBUb2tlblBvbGxlcih7XG4gICAgZGFya1BlZ01hcmtldCxcbiAgICBkaXNjb3JkQ2xpZW50LFxuICAgIHJlZnJlc2hSYXRlLFxuICAgIHRva2VuOiBuZXcgRFVTREMoeyBwcm92aWRlcjogd2FsbGV0LnByb3ZpZGVyIH0pLFxuICAgIGNvbXBhcmF0b3I6IENvbXBhcmF0b3IuZ3JlYXRlclRoYW4sXG4gICAgd2F0Y2hQcmljZTogMS4wMCxcbiAgfSk7XG4gIG5ldyBUb2tlblBvbGxlcih7XG4gICAgZGFya1BlZ01hcmtldCxcbiAgICBkaXNjb3JkQ2xpZW50LFxuICAgIHJlZnJlc2hSYXRlLFxuICAgIHRva2VuOiBuZXcgRENSTyh7IHByb3ZpZGVyOiB3YWxsZXQucHJvdmlkZXIgfSksXG4gICAgY29tcGFyYXRvcjogQ29tcGFyYXRvci5ncmVhdGVyVGhhbixcbiAgICB3YXRjaFByaWNlOiAxLjAwLFxuICB9KTtcbiAgbmV3IFRva2VuUG9sbGVyKHtcbiAgICBkYXJrUGVnTWFya2V0LFxuICAgIGRpc2NvcmRDbGllbnQsXG4gICAgcmVmcmVzaFJhdGUsXG4gICAgdG9rZW46IG5ldyBEQ09GKHsgcHJvdmlkZXI6IHdhbGxldC5wcm92aWRlciB9KSxcbiAgICBjb21wYXJhdG9yOiBDb21wYXJhdG9yLmdyZWF0ZXJUaGFuLFxuICAgIHdhdGNoUHJpY2U6IDEuMDAsXG4gIH0pO1xuICBuZXcgVG9rZW5Qb2xsZXIoe1xuICAgIGRhcmtQZWdNYXJrZXQsXG4gICAgZGlzY29yZENsaWVudCxcbiAgICByZWZyZXNoUmF0ZSxcbiAgICB0b2tlbjogbmV3IERVU0RUKHsgcHJvdmlkZXI6IHdhbGxldC5wcm92aWRlciB9KSxcbiAgICBjb21wYXJhdG9yOiBDb21wYXJhdG9yLmdyZWF0ZXJUaGFuLFxuICAgIHdhdGNoUHJpY2U6IDEuMDAsXG4gIH0pO1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgYXdhaXQgc2xlZXAoMjAwMCk7XG4gIH1cbn1cblxucnVuTW9uaXRvcigpXG4gIC50aGVuKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnQ29tcGxldGUnKTtcbiAgfSlcbiAgLmNhdGNoKGVyciA9PiB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9KTsiXX0=