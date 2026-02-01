package com.room.booking.core.handler;

import lombok.extern.log4j.Log4j2;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Log4j2

public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(APIException.class)
    public ResponseEntity<ErrorApiResponse> handlerGenericException(APIException ex) {
        log.info("{} - Exception message: {}", ex.getStatusException(), ex.getMessage());
        return ex.buildErrorResponseEntity();
    }

    
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorApiResponse> handleAccessDeniedException(AccessDeniedException ex) {
        log.warn("Acesso Negado: {}", ex.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ErrorApiResponse.builder()
                        .description("ACCESS DENIED")
                        .message("Você não tem permissão para acessar este recurso.")
                        .build());
    }

    @ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<ErrorApiResponse> handlerBadCredentialsException(InternalAuthenticationServiceException ex) {
        log.error("Exception: ", ex);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ErrorApiResponse.builder().description("CREDENCIAL ERROR!")
                        .message("USUARIO OU SENHA ESTÃO INVÁLIDOS").build());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorApiResponse> handlerBadCredentialsException(BadCredentialsException ex) {
        log.error("Exception: ", ex);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ErrorApiResponse.builder().description("CREDENCIAL ERROR!")
                        .message("USUARIO OU SENHA ESTÃO INVÁLIDOS").build());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorApiResponse> handlerDataIntegrityException(DataIntegrityViolationException ex) {
        log.error("Exception: ", ex);
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ErrorApiResponse.builder()
                        .description("REGISTRATION ERROR!")
                        .message("O EMAIL OU DOCUMENTO IDENTIFICADOR JÁ ESTÁ REGISTRADO").build());
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
            HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        log.warn("Erro ao ler mensagem HTTP: {}", ex.getMessage());

        String mensagemErro = "Formato de dados inválido";

        if (ex.getMessage() != null) {
            if (ex.getMessage().contains("LocalDate")) {
                mensagemErro = "Data inválida. Certifique-se de que a data existe e está no formato \"yyyy-MM-dd\" (entre aspas)";
            } else if (ex.getMessage().contains("LocalTime") || ex.getMessage().contains("raw timestamp")) {
                mensagemErro = "Hora inválida. Certifique-se de que os horários estão no formato \"HH:mm:ss\" (entre aspas). " +
                        "Exemplo: \"horaInicio\": \"14:00:00\"";
            } else if (ex.getMessage().contains("JSON parse error")) {
                mensagemErro = "Erro ao processar JSON. Verifique se todos os valores de texto e horários estão entre aspas";
            }
        }

        ErrorApiResponse errorResponse = ErrorApiResponse.builder()
                .description("INVALID DATA FORMAT")
                .message(mensagemErro)
                .build();

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }


    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        
        log.info("Erro de validação: {}", ex.getMessage());
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });


        ErrorApiResponse errorResponse = ErrorApiResponse.builder()
                .description("VALIDATION FAILED")
                .message("Um ou mais campos falharam na validação.")
                .details(errors)
                .build();
        
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorApiResponse> handlerGenericException(Exception ex) {
        log.error("Exception: ", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorApiResponse.builder().description("INTERNAL SERVER ERROR!")
                        .message("POR FAVOR INFORME AO ADMINISTRADOR DO SISTEMA!").build());
    }
}