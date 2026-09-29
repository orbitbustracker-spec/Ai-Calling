import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function pushToGoogleSheets(orgId: string, rowData: string[]) {
  try {
    const config = await prisma.googleSheetsConfig.findUnique({
      where: { organizationId: orgId }
    });

    if (!config || !config.isActive) {
      console.log('Google Sheets integration not active for org', orgId);
      return false;
    }

    // In a real app, this would use googleapis package
    // const { google } = require('googleapis');
    // const auth = new google.auth.GoogleAuth({ ... });
    // const sheets = google.sheets({ version: 'v4', auth });
    // await sheets.spreadsheets.values.append({ ... });

    console.log(`[Google Sheets Mock] Pushing to Sheet ${config.spreadsheetId}:`, rowData);
    return true;
  } catch (error) {
    console.error('Error pushing to Google Sheets:', error);
    return false;
  }
}