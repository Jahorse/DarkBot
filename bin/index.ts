import { ethers, providers } from 'ethers';

import { Discord } from '../lib/discord-client';
import { Comparator, TokenPoller } from '../lib/token-poller';
import { DarkPegMarket } from '../lib/tokens/dark-peg-market';
import { DCOF } from '../lib/tokens/dcof';
import { DCRO } from '../lib/tokens/dcro';
import { DUSDC } from '../lib/tokens/dusdc';
import { DUSDT } from '../lib/tokens/dusdt';
import { default as Secrets } from '../secrets.json';

function sleep(ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runMonitor(): Promise<void> {
  const refreshRate = 10000; // ms
  const discordClient = new Discord();
  const rpcUrl = 'https://evm.cronos.org/';
  const provider = new providers.JsonRpcProvider(rpcUrl);
  const pk = Secrets[2];
  const wallet = new ethers.Wallet(pk, provider);

  const darkPegMarket = new DarkPegMarket({ wallet });

  new TokenPoller({
    darkPegMarket,
    discordClient,
    refreshRate,
    token: new DUSDC({ provider: wallet.provider }),
    comparator: Comparator.greaterThan,
    watchPrice: 1.00,
  });
  new TokenPoller({
    darkPegMarket,
    discordClient,
    refreshRate,
    token: new DCRO({ provider: wallet.provider }),
    comparator: Comparator.greaterThan,
    watchPrice: 1.00,
  });
  new TokenPoller({
    darkPegMarket,
    discordClient,
    refreshRate,
    token: new DCOF({ provider: wallet.provider }),
    comparator: Comparator.greaterThan,
    watchPrice: 1.00,
  });
  new TokenPoller({
    darkPegMarket,
    discordClient,
    refreshRate,
    token: new DUSDT({ provider: wallet.provider }),
    comparator: Comparator.greaterThan,
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