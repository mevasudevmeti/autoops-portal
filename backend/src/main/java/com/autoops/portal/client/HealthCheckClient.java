package com.autoops.portal.client;

import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Component
public class HealthCheckClient {

    private final HttpClient httpClient;

    public HealthCheckClient(
            HttpClient healthCheckHttpClient
    ) {
        this.httpClient =
                healthCheckHttpClient;
    }

    public HealthCheckResult check(
            String healthUrl
    ) {
        try {
            HttpRequest request =
                    HttpRequest
                            .newBuilder()
                            .uri(
                                    URI.create(
                                            healthUrl
                                    )
                            )
                            .timeout(
                                    Duration.ofSeconds(5)
                            )
                            .header(
                                    "Accept",
                                    "application/json"
                            )
                            .GET()
                            .build();

            HttpResponse<Void> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers
                                    .discarding()
                    );

            int statusCode =
                    response.statusCode();

            boolean healthy =
                    statusCode >= 200
                            && statusCode < 300;

            return new HealthCheckResult(
                    healthy,
                    statusCode,
                    "Health endpoint returned HTTP "
                            + statusCode
            );

        } catch (InterruptedException exception) {

            Thread.currentThread().interrupt();

            return new HealthCheckResult(
                    false,
                    null,
                    "Health check was interrupted"
            );

        } catch (
                IOException
                | IllegalArgumentException exception
        ) {

            return new HealthCheckResult(
                    false,
                    null,
                    "Health check failed: "
                            + exception.getMessage()
            );
        }
    }
}