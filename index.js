// scraper.js

const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());

async function scrapeData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Navegar a la URL
        await page.goto('https://mapadelestado.jefatura.gob.ar/');

        // Esperar a que la página cargue completamente
        await page.waitForSelector('.flex-wrap.card-body');

        // Extraer los datos de los ministerios
        const presidencia = await page.evaluate(() => {
            const h1Element = document.querySelector('h1.jurbox.bg-oscuro');
            const name = h1Element?.nextElementSibling?.textContent.trim() || 'No encontrado';
            return name;
        });

        const jefatura = await page.evaluate(() => {
            const h3Element = Array.from(document.querySelectorAll('h3.fontSizeMayor.jurbox.bg-oscuro'))
                .find(el => el.textContent.includes('Jefatura de Gabinete de Ministros'));
            const name = h3Element?.nextElementSibling?.textContent.trim() || 'No encontrado';
            return name;
        });

        const economia = await page.evaluate(() => {
            const h3Element = Array.from(document.querySelectorAll('h3.fontSizeMayor.jurbox.bg-oscuro'))
                .find(el => el.textContent.includes('Ministerio de Economía'));
            const name = h3Element?.nextElementSibling?.textContent.trim() || 'No encontrado';
            return name;
        });

        const seguridad = await page.evaluate(() => {
            const h3Element = Array.from(document.querySelectorAll('h3.fontSizeMayor.jurbox.bg-oscuro'))
                .find(el => el.textContent.includes('Ministerio de Seguridad'));
            const name = h3Element?.nextElementSibling?.textContent.trim() || 'No encontrado';
            return name;
        });

        const capHumano = await page.evaluate(() => {
            const h3Element = Array.from(document.querySelectorAll('h3.fontSizeMayor.jurbox.bg-oscuro'))
                .find(el => el.textContent.includes('Ministerio de Capital Humano'));
            const name = h3Element?.nextElementSibling?.textContent.trim() || 'No encontrado';
            return name;
        });

        const desregulacion = await page.evaluate(() => {
            const h3Element = Array.from(document.querySelectorAll('h3.fontSizeMenor.jurbox.bg-oscuro'))
                .find(el => el.textContent.includes('Ministerio de Desregulación y Transformación del Estado'));
            const name = h3Element?.nextElementSibling?.textContent.trim() || 'No encontrado';
            return name;
        });

        const salud = await page.evaluate(() => {
            const h3Element = Array.from(document.querySelectorAll('h3.fontSizeMayor.jurbox.bg-oscuro'))
                .find(el => el.textContent.includes('Ministerio de Salud'));
            const name = h3Element?.nextElementSibling?.textContent.trim() || 'No encontrado';
            return name;
        });

        const exterior = await page.evaluate(() => {
            const h3Element = Array.from(document.querySelectorAll('h3.fontSizeMenor.jurbox.bg-oscuro'))
                .find(el => el.textContent.includes('Ministerio de Relaciones Exteriores, Comercio Internacional y Culto'));
            const name = h3Element?.nextElementSibling?.textContent.trim() || 'No encontrado';
            return name;
        });

        const justicia = await page.evaluate(() => {
            const h3Element = Array.from(document.querySelectorAll('h3.fontSizeMayor.jurbox.bg-oscuro'))
                .find(el => el.textContent.includes('Ministerio de Justicia'));
            const name = h3Element?.nextElementSibling?.textContent.trim() || 'No encontrado';
            return name;
        });

        const defensa = await page.evaluate(() => {
            const h3Element = Array.from(document.querySelectorAll('h3.fontSizeMayor.jurbox.bg-oscuro'))
                .find(el => el.textContent.includes('Ministerio de Defensa'));
            const name = h3Element?.nextElementSibling?.textContent.trim() || 'No encontrado';
            return name;
        });

        return {
            presidencia,
            jefatura,
            economia,
            seguridad,
            capHumano,
            desregulacion,
            salud,
            exterior,
            justicia,
            defensa
        };
    } catch (error) {
        throw error;
    } finally {
        await browser.close();
    }
}

app.get('/', async (req, res) => {
    try {
        const data = await scrapeData();  // Aquí deberías tener la lógica para obtener los datos
        res.json(data);  // Envías los datos como respuesta JSON
    } catch (error) {
        res.status(500).json({ error: error.message });  // Manejo de errores
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
