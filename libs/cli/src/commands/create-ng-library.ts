import { Command, flags as oFlags } from '@oclif/command';
import * as Parser from '@oclif/parser';

export default class CreateNgLibrary extends Command {
  static description: string = 'create an angular library';

  static examples: string[] = [`$ cz-cli create-ng-library`];

  static flags: oFlags.Input<{ help: void }> = {
    help: oFlags.help({ char: 'h' }),
  };

  static args: Parser.args.IArg[] = [];

  async run(): Promise<void> {
    this.validate();
    const { flags } = this.parse(CreateNgLibrary);
    this.log('Not implemented, doing nothing');
  }

  private validate(): void {
    // is ok
  }
}
