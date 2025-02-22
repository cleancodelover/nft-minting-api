import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { ApiResponseType } from "src/shared/types/global";

function getNestedModelsDynamic(model: Type<any>, currentDepth = 0, maxDepth = 2): Type<any>[] {
  if (!model) {
    return []; // Return an empty array if the model is null or undefined
  }
  
  const nestedModels = [model];

  // Inspect properties of the model and find nested models
  for (const propertyKey of Object.keys(model.prototype)) {
    const metadata = Reflect.getMetadata('design:type', model.prototype, propertyKey);
    if (metadata && typeof metadata === 'function' && metadata.name !== 'Object' && metadata.name !== 'Array') {
      nestedModels.push(metadata);
      // nestedModels.push(...getNestedModelsDynamic(metadata, currentDepth + 1, maxDepth));
    }
  }

  return nestedModels;
}

export const ApiResponseConfig = <TModel extends Type<any>>(
  model: TModel,
  status = 200,
  type: 'array' | 'object' = 'object',
  description?: string
) => {
  return applyDecorators(
    ApiExtraModels(ApiResponseType, ...getNestedModelsDynamic(model)),
    ApiResponse({
      status,
      description: description ?? '',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseType) },
          {
            properties: {
              data: type === 'array' // Adjust for array or object responses
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  }
                : { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    })
  );
};