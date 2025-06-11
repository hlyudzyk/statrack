package com.statrack.statrack.services.consumers;

import com.statrack.statrack.api.dto.UserStatsDTO;
import com.statrack.statrack.services.email.EmailService;
import com.statrack.statrack.services.ExcelGenerator;
import com.statrack.statrack.services.UserService;
import com.statrack.statrack.services.messages.StatsReportRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatsReportConsumer {
    private final UserService userService;
    private final EmailService emailService;

    @RabbitListener(queues = "statsReportQueue")
    public void handleStatsReportRequest(StatsReportRequest request) {
        try {
            List<UserStatsDTO> statsList = userService.computeAllUserStats();
            byte[] excelFile = ExcelGenerator.generateUserStatsExcel(statsList);

            emailService.sendMessage(
                request.getEmail(),
                "Звіт про статистику користувачів",
                "Будь ласка знайдіть прикріплений Excel файл з статистикою.",
                excelFile,
                "user_stats.xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
