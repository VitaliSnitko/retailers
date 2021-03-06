package com.itechart.retailers.controller.advice;

import com.itechart.retailers.model.payload.response.MessageResp;
import com.itechart.retailers.service.exception.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static com.itechart.retailers.controller.constant.Message.*;

@ControllerAdvice
public class NotFoundExceptionAdvice {
	private static final Logger LOGGER = LoggerFactory.getLogger(NotFoundExceptionAdvice.class);

	@ExceptionHandler(ItemNotFoundException.class)
	public ResponseEntity<?> handleItemNotFoundException(ItemNotFoundException e) {
		LOGGER.warn(ITEM_NOT_FOUND_MSG);
		return ResponseEntity.badRequest().body(new MessageResp(ITEM_NOT_FOUND_MSG));
	}

	@ExceptionHandler(LocationNotFoundException.class)
	public ResponseEntity<?> handleLocationNotFoundException(LocationNotFoundException e) {
		LOGGER.warn(LOCATION_IS_NOT_FOUND_MSG);
		return ResponseEntity.badRequest().body(new MessageResp(LOCATION_IS_NOT_FOUND_MSG));
	}

	@ExceptionHandler(CustomerCategoryNotFoundException.class)
	public ResponseEntity<?> handleCustomerCategoryNotFoundException(CustomerCategoryNotFoundException e) {
		LOGGER.warn(CUSTOMER_CATEGORY_MSG);
		return ResponseEntity.badRequest().body(new MessageResp(CUSTOMER_CATEGORY_MSG));
	}

	@ExceptionHandler(ApplicationNotFoundException.class)
	public ResponseEntity<?> handleApplicationNotFoundException(ApplicationNotFoundException e){
		LOGGER.warn(APPLICATION_NOT_FOUND_MSG);
		return ResponseEntity.badRequest().body(new MessageResp(APPLICATION_NOT_FOUND_MSG));
	}

	@ExceptionHandler(RoleNotFoundException.class)
	public ResponseEntity<?> handleRoleNotFoundException(RoleNotFoundException e){
		LOGGER.warn(ROLE_NOT_FOUND_MSG);
		return ResponseEntity.badRequest().body(new MessageResp(ROLE_NOT_FOUND_MSG));
	}
}
