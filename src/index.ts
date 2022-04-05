import 'module-alias/register'
import helmet from 'helmet'
import { StartProjectInit } from "@tsclean/core";
import { AppContainer } from '@/application/app'
import { PORT } from '@/application/config/environment'


export async function createApp() {
  const app = await StartProjectInit.create(AppContainer);
  app.use(helmet());
  return app;
}

async function run (): Promise<void> {
  const app = await createApp();
  await app.listen(PORT, () => console.log('Running on port ' + PORT))
}
run()



