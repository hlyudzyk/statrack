package com.statrack.statrack.services;

import com.statrack.statrack.api.dto.UserStatsDTO;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelGenerator {

    public static byte[] generateUserStatsExcel(List<UserStatsDTO> statsList) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("User Statistics");

        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Username");
        headerRow.createCell(1).setCellValue("Total Online Time (Minutes)");
        headerRow.createCell(2).setCellValue("Total Break Time (Minutes)");
        headerRow.createCell(3).setCellValue("Total Sessions");
        headerRow.createCell(4).setCellValue("Average Session Time (Minutes)");

        int rowNum = 1;
        for (UserStatsDTO stat : statsList) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(stat.getUsername());
            row.createCell(1).setCellValue(stat.getTotalOnlineTime().toMinutes());
            row.createCell(2).setCellValue(stat.getTotalBreakTime().toMinutes());
            row.createCell(3).setCellValue(stat.getTotalSessions());
            row.createCell(4).setCellValue(stat.getAverageSessionTime().toMinutes());
        }

        for (int i = 0; i < 5; i++) {
            sheet.autoSizeColumn(i);
        }

        try (ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            workbook.write(bos);
            return bos.toByteArray();
        } finally {
            workbook.close();
        }
    }
}
