package com.autoops.portal.exception;

import com.autoops.portal.dto.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ServiceNotFoundException.class)
    public ResponseEntity<ApiErrorResponse>
    handleServiceNotFound(
            ServiceNotFoundException exception,
            HttpServletRequest request
    ) {
        ApiErrorResponse response =
                new ApiErrorResponse(
                        HttpStatus.NOT_FOUND.value(),
                        "NOT_FOUND",
                        exception.getMessage(),
                        request.getRequestURI()
                );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    @ExceptionHandler(DuplicateServiceException.class)
    public ResponseEntity<ApiErrorResponse>
    handleDuplicateService(
            DuplicateServiceException exception,
            HttpServletRequest request
    ) {
        ApiErrorResponse response =
                new ApiErrorResponse(
                        HttpStatus.CONFLICT.value(),
                        "CONFLICT",
                        exception.getMessage(),
                        request.getRequestURI()
                );

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorResponse>
    handleValidation(
            MethodArgumentNotValidException exception,
            HttpServletRequest request
    ) {
        String message =
                exception
                        .getBindingResult()
                        .getFieldErrors()
                        .stream()
                        .map(error ->
                                error.getField()
                                        + ": "
                                        + error.getDefaultMessage()
                        )
                        .collect(
                                Collectors.joining("; ")
                        );

        ApiErrorResponse response =
                new ApiErrorResponse(
                        HttpStatus.BAD_REQUEST.value(),
                        "VALIDATION_ERROR",
                        message,
                        request.getRequestURI()
                );

        return ResponseEntity
                .badRequest()
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse>
    handleUnexpected(
            Exception exception,
            HttpServletRequest request
    ) {
        ApiErrorResponse response =
                new ApiErrorResponse(
                        HttpStatus.INTERNAL_SERVER_ERROR.value(),
                        "INTERNAL_SERVER_ERROR",
                        "An unexpected error occurred",
                        request.getRequestURI()
                );

        return ResponseEntity
                .status(
                        HttpStatus.INTERNAL_SERVER_ERROR
                )
                .body(response);
    }
}