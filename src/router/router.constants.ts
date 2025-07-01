export const HTTP_CODE_NUMBER: Record<string, Record<string, number>> = {
	INFORMATIVE: {
		PROCESSING: 102,
	},
	SATISFACTORY: {
		OK: 200,
		CREATED: 201,
		NO_CONTENT: 204,
	},
	REDIRECTIONS: {
		MOVED_PERMANENTLY: 301,
		TEMPORARY_REDIRECT: 302,
		NOT_MODIFIED: 304,
	},
	CLIENT_ERRORS: {
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		ACCESS_FORBIDDEN: 403,
		NOT_FOUND: 404,
		CONFLICT: 409,
	},
	SERVER_ERRORS: {
		INTERNAL_ERROR: 500,
		NOT_IMPLEMENTED: 501,
		SERVICE_UNAVAILABLE: 503,
	},
} as const

export const HTTP_CODE_MEANING: Record<number, string> = {
	100: 'CONTINUE',
	102: 'PROCESSING',
	200: 'OK',
	201: 'CREATED',
	204: 'NO_CONTENT',
	301: 'MOVED_PERMANENTLY',
	302: 'TEMPORARY_REDIRECT',
	304: 'NOT_MODIFIED',
	400: 'BAD_REQUEST',
	401: 'UNAUTHORIZED',
	403: 'ACCESS_FORBIDDEN',
	404: 'NOT_FOUND',
	409: 'CONFLICT',
	500: 'INTERNAL_ERROR',
	501: 'NOT_IMPLEMENTED',
	503: 'SERVICE_UNAVAILABLE',
} as const

export const HTTP_CODE_MESSAGE: Record<number, string> = {
	100: 'El cliente debe continuar con la solicitud.',
	102: 'La solicitud ha sido recibida y está siendo procesada.',
	200: 'La solicitud fue exitosa.',
	201: 'El recurso fue creado exitosamente.',
	204: 'Operación válida, sin efecto sobre los datos existentes.',
	301: 'El recurso solicitado se ha movido permanentemente a otra URL.',
	302: 'El recurso solicitado se encuentra temporalmente en otra ubicación.',
	304: 'El recurso no ha sido modificado desde la última solicitud.',
	400: 'La solicitud no pudo ser procesada debido a un error del cliente.',
	401: 'Las credenciales utilizadas no son válidas.',
	403: 'El acceso al recurso solicitado está prohibido.',
	404: 'El recurso solicitado no fue encontrado.',
	409: 'Conflicto al procesar la solicitud: el recurso ya existe o viola restricciones.',
	500: 'Error interno del servidor. Intente nuevamente más tarde.',
	501: 'Funcionalidad no implementada en el servidor.',
	503: 'Servicio no disponible temporalmente. Intente más tarde.',
} as const

export const HTTP_REQUEST_DATA_SOURCE = {
	BODY: 'body',
	PARAMS: 'params',
	QUERY: 'query',
	FILES: 'files',
} as const
