/**
 * Recursive deep-merge of plain objects.
 * Used for i18n fallback: shallow merge would lose nested keys when a
 * locale defines only some of the messages inside a namespace.
 *
 * - Arrays are replaced (not concatenated) — natural for translation strings.
 * - Non-object values from `override` always win over `base`.
 * - Returns a new object; inputs are not mutated.
 */

type Messages = Record<string, unknown>;

function isPlainObject(value: unknown): value is Messages {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

export function deepMerge<T extends Messages>(base: T, override: Messages): T {
  const result: Messages = { ...base };

  for (const key of Object.keys(override)) {
    const baseValue = result[key];
    const overrideValue = override[key];

    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else if (overrideValue !== undefined) {
      result[key] = overrideValue;
    }
  }

  return result as T;
}
