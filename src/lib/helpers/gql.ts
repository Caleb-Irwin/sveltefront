export const gql = <DataType, Vars extends Record<string, string | number> = Record<string, never>>(
	chunks: TemplateStringsArray,
	...variables: unknown[]
): GQL<DataType, Vars> => {
	const query = /* from graphql-request */ chunks.reduce(
		(acc, chunk, index) => `${acc}${chunk}${index in variables ? String(variables[index]) : ``}`,
		``
	);

	return { query };
};

export type extractGeneric<Type> = Type extends GQL<infer DataType> ? DataType : never;
export type extractSecondGeneric<Type> = Type extends GQL<unknown, infer Vars> ? Vars : never;

export interface GQL<
	DataType = unknown,
	Vars extends Record<string, string | number> = Record<string, never>
> {
	readonly query: string;
}
