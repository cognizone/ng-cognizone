import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import * as handlebars from 'handlebars';
import { isAbsolute, join, dirname } from 'path';

export class TemplateService {
  static async process(templatePath: string, targetPath: string, options: { context?: {}; force?: boolean } = {}): Promise<void> {
    if (!options.force && existsSync(targetPath)) return;
    templatePath = isAbsolute(templatePath) ? templatePath : join(__dirname, '../../assets/templates', templatePath);
    const templateContent = readFileSync(templatePath, { encoding: 'utf8' });
    const template = handlebars.compile(templateContent);
    const content = template(options.context);
    const dirPath = dirname(targetPath);
    mkdirSync(dirPath, { recursive: true });
    writeFileSync(targetPath, content, 'utf8');
  }
}
