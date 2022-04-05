import 'module-alias/register'
import helmet from 'helmet'
import { StartProjectInit } from "@tsclean/core";
import { AppContainer } from '@/application/app'
import { PORT } from '@/application/config/environment'
import * as Config from "@/application/config/environment";
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';

export async function createApp() {
  const app = await StartProjectInit.create(AppContainer);
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(cors());
  if (Config.CONSOLE_LOGG_ENABLED) app.use(morgan('dev'));
  return app;
}

async function run (): Promise<void> {
  const app = await createApp();
  await app.listen(PORT, () => console.log('Running on port ' + PORT))
}
run()



