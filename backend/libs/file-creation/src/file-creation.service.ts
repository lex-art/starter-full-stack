import { envs } from '@app/config/env/envs'
import { Injectable } from '@nestjs/common'
import { RenderFunction, template } from 'dot'
import { Column, Workbook } from 'exceljs'
import { readFileSync } from 'fs'
import { join } from 'path'
import * as PDFDocument from 'pdfkit'
import { launch } from 'puppeteer'
import { excelUtil } from './utils/excel-util'

@Injectable()
export class FileCreationService {
	constructor() {}

	public async generateExcelFile({
		rows,
		columns,
		nameExcel
	}: {
		rows: Array<any>
		columns: Partial<Column>[]
		nameExcel: string
	}) {
		const workbook = new Workbook()
		const worksheet = workbook.addWorksheet(nameExcel)
		worksheet.name = nameExcel
		worksheet.columns = columns
		const stylesHeader = worksheet.getRow(1)
		columns.forEach((column) => {
			const headerCell = stylesHeader.getCell(column.key)
			headerCell.style = {
				font: excelUtil.font
			}
			headerCell.alignment = { horizontal: 'center' }
			headerCell.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: '1976D2' }
			}
		})

		if (rows.length > 0) {
			worksheet.addRows(rows)
		}

		const buffer = await workbook.xlsx.writeBuffer()
		return buffer
	}

	public generateRawPdfFile() {
		const pdf = new PDFDocument()

		pdf.fontSize(16).text('Texto de prueba', { align: 'center' })
		pdf.moveDown()

		pdf.fontSize(12).text('Este es un ejemplo de archivo PDF generado con NestJS y pdfkit.')

		return pdf
	}

	public async generateHTMLPdfFile(dataFile: Record<string, unknown>) {
		const browser = await launch({
			headless: true,
			executablePath: envs.NODE_ENV === 'production' ? '/usr/bin/chromium-browser' : undefined,
			ignoreDefaultArgs: ['--disable-extensions']
		})
		const page = await browser.newPage()
		const templateFile: string = readFileSync(
			join(__dirname, '/utils/templatesPDF/template.html'),
			'utf8'
		)
		const logo: string = readFileSync(join(__dirname, '/utils/templatesPDF/logo.png'), 'base64')
		const templateFuncion: RenderFunction = template(templateFile)
		const html = templateFuncion(
			dataFile ?? { logo, id: '001', name: 'Juan Perez', createdDate: '2021-09-01' }
		)
		await page.setContent(html)
		const pdf = await page.pdf({
			format: 'letter',
			margin: {
				top: '0.5cm',
				bottom: '0.5cm',
				left: '0.5cm',
				right: '0.5cm'
			}
		})
		await browser.close()
		return pdf
	}
}
