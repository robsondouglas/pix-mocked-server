import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MemoryDB } from './libs/fakedb';
import {correntistas} from './data/db.json'
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  
  
  MemoryDB.create("COB", ['txid']);
  MemoryDB.create("LOCATIONS", ['id', 'uuid']);

  const ServerErrorTypes = {
    400: { type: "https://pix.bcb.gov.br/api/v2/error/CobOperacaoInvalida", title: "Payload inválido" },
    403: { type: "https://pix.bcb.gov.br/api/v2/error/AcessoNegado", title: "Acesso Negado" },
    404: { type: "https://pix.bcb.gov.br/api/v2/error/NaoEncontrado", title: "Não Encontrado" },
    503: { type: "https://pix.bcb.gov.br/api/v2/error/ServicoIndisponivel", title: "Serviço não está disponível no momento. Serviço solicitado pode estar em manutenção ou fora da janela de funcionamento." },
}


  const corr =  MemoryDB.create("CORRENTISTAS", ['chave']);
    await Promise.all(correntistas.map(async (c) => {
      await corr.add('DEV', c)
    }));
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);

  const auth = await NestFactory.create(AuthModule);
  await auth.listen(3001);
}
bootstrap();
