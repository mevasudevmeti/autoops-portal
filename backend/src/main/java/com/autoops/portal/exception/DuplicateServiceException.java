package com.autoops.portal.exception;

import com.autoops.portal.entity.Environment;

public class DuplicateServiceException extends RuntimeException {

    public DuplicateServiceException(
            String name,
            Environment environment
    ) {
        super(
                "Service already exists with name '"
                        + name
                        + "' in environment "
                        + environment
        );
    }
}