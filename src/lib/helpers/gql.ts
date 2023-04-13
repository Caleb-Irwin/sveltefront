export const gql = <DataType>(
	chunks: TemplateStringsArray,
	...variables: unknown[]
): GQL<DataType> => {
	const query = /* from graphql-request */ chunks.reduce(
		(acc, chunk, index) => `${acc}${chunk}${index in variables ? String(variables[index]) : ``}`,
		``
	);

	return { query };
};

export type extractGeneric<Type> = Type extends GQL<infer DataType> ? DataType : never;

export interface GQL<DataType = unknown> {
	readonly query: string;
	readonly vars?: { [varName: string]: string };
}
