import { c as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, d as createAstro, u as unescapeHTML, b as renderComponent } from './astro/server_Bu460bVi.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$Layout } from './Layout_fY_m_PqC.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from './_astro_assets_DywcBzPu.mjs';
import * as CrossFetch from 'cross-fetch';
import CrossFetch__default from 'cross-fetch';
import gql from 'graphql-tag';

const defaultJsonSerializer = JSON;

const uppercase = (str) => str.toUpperCase();
/**
 * Convert Headers instance into regular object
 */
const HeadersInstanceToPlainObject = (headers) => {
    const o = {};
    headers.forEach((v, k) => {
        o[k] = v;
    });
    return o;
};

const parseRequestArgs = (documentOrOptions, variables, requestHeaders) => {
    return documentOrOptions.document
        ? documentOrOptions
        : {
            document: documentOrOptions,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
};
const parseRawRequestArgs = (queryOrOptions, variables, requestHeaders) => {
    return queryOrOptions.query
        ? queryOrOptions
        : {
            query: queryOrOptions,
            variables: variables,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
};
const parseBatchRequestArgs = (documentsOrOptions, requestHeaders) => {
    return documentsOrOptions.documents
        ? documentsOrOptions
        : {
            documents: documentsOrOptions,
            requestHeaders: requestHeaders,
            signal: undefined,
        };
};

function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(message);
  }
}

/**
 * Return true if `value` is object-like. A value is object-like if it's not
 * `null` and has a `typeof` result of "object".
 */
function isObjectLike(value) {
  return typeof value == 'object' && value !== null;
}

function invariant(condition, message) {
  const booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(
      'Unexpected invariant triggered.',
    );
  }
}

const LineRegExp = /\r\n|[\n\r]/g;
/**
 * Represents a location in a Source.
 */

/**
 * Takes a Source and a UTF-8 character offset, and returns the corresponding
 * line and column as a SourceLocation.
 */
function getLocation(source, position) {
  let lastLineStart = 0;
  let line = 1;

  for (const match of source.body.matchAll(LineRegExp)) {
    typeof match.index === 'number' || invariant(false);

    if (match.index >= position) {
      break;
    }

    lastLineStart = match.index + match[0].length;
    line += 1;
  }

  return {
    line,
    column: position + 1 - lastLineStart,
  };
}

/**
 * Render a helpful description of the location in the GraphQL Source document.
 */
function printLocation(location) {
  return printSourceLocation(
    location.source,
    getLocation(location.source, location.start),
  );
}
/**
 * Render a helpful description of the location in the GraphQL Source document.
 */

function printSourceLocation(source, sourceLocation) {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = ''.padStart(firstLineColumnOffset) + source.body;
  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;
  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}\n`;
  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex]; // Special case for minified documents

  if (locationLine.length > 120) {
    const subLineIndex = Math.floor(columnNum / 80);
    const subLineColumnNum = columnNum % 80;
    const subLines = [];

    for (let i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }

    return (
      locationStr +
      printPrefixedLines([
        [`${lineNum} |`, subLines[0]],
        ...subLines.slice(1, subLineIndex + 1).map((subLine) => ['|', subLine]),
        ['|', '^'.padStart(subLineColumnNum)],
        ['|', subLines[subLineIndex + 1]],
      ])
    );
  }

  return (
    locationStr +
    printPrefixedLines([
      // Lines specified like this: ["prefix", "string"],
      [`${lineNum - 1} |`, lines[lineIndex - 1]],
      [`${lineNum} |`, locationLine],
      ['|', '^'.padStart(columnNum)],
      [`${lineNum + 1} |`, lines[lineIndex + 1]],
    ])
  );
}

function printPrefixedLines(lines) {
  const existingLines = lines.filter(([_, line]) => line !== undefined);
  const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
  return existingLines
    .map(([prefix, line]) => prefix.padStart(padLen) + (line ? ' ' + line : ''))
    .join('\n');
}

function toNormalizedOptions(args) {
  const firstArg = args[0];

  if (firstArg == null || 'kind' in firstArg || 'length' in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5],
    };
  }

  return firstArg;
}
/**
 * A GraphQLError describes an Error found during the parse, validate, or
 * execute phases of performing a GraphQL operation. In addition to a message
 * and stack trace, it also includes information about the locations in a
 * GraphQL document and/or execution result that correspond to the Error.
 */

class GraphQLError extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */

  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */

  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */

  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */

  /**
   * The original error thrown from a field resolver during execution.
   */

  /**
   * Extension fields to add to the formatted error.
   */

  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(message, ...rawArgs) {
    var _this$nodes, _nodeLocations$, _ref;

    const { nodes, source, positions, path, originalError, extensions } =
      toNormalizedOptions(rawArgs);
    super(message);
    this.name = 'GraphQLError';
    this.path = path !== null && path !== void 0 ? path : undefined;
    this.originalError =
      originalError !== null && originalError !== void 0
        ? originalError
        : undefined; // Compute list of blame nodes.

    this.nodes = undefinedIfEmpty(
      Array.isArray(nodes) ? nodes : nodes ? [nodes] : undefined,
    );
    const nodeLocations = undefinedIfEmpty(
      (_this$nodes = this.nodes) === null || _this$nodes === void 0
        ? void 0
        : _this$nodes.map((node) => node.loc).filter((loc) => loc != null),
    ); // Compute locations in the source for the given nodes/positions.

    this.source =
      source !== null && source !== void 0
        ? source
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : (_nodeLocations$ = nodeLocations[0]) === null ||
          _nodeLocations$ === void 0
        ? void 0
        : _nodeLocations$.source;
    this.positions =
      positions !== null && positions !== void 0
        ? positions
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : nodeLocations.map((loc) => loc.start);
    this.locations =
      positions && source
        ? positions.map((pos) => getLocation(source, pos))
        : nodeLocations === null || nodeLocations === void 0
        ? void 0
        : nodeLocations.map((loc) => getLocation(loc.source, loc.start));
    const originalExtensions = isObjectLike(
      originalError === null || originalError === void 0
        ? void 0
        : originalError.extensions,
    )
      ? originalError === null || originalError === void 0
        ? void 0
        : originalError.extensions
      : undefined;
    this.extensions =
      (_ref =
        extensions !== null && extensions !== void 0
          ? extensions
          : originalExtensions) !== null && _ref !== void 0
        ? _ref
        : Object.create(null); // Only properties prescribed by the spec should be enumerable.
    // Keep the rest as non-enumerable.

    Object.defineProperties(this, {
      message: {
        writable: true,
        enumerable: true,
      },
      name: {
        enumerable: false,
      },
      nodes: {
        enumerable: false,
      },
      source: {
        enumerable: false,
      },
      positions: {
        enumerable: false,
      },
      originalError: {
        enumerable: false,
      },
    }); // Include (non-enumerable) stack trace.

    /* c8 ignore start */
    // FIXME: https://github.com/graphql/graphql-js/issues/2317

    if (
      originalError !== null &&
      originalError !== void 0 &&
      originalError.stack
    ) {
      Object.defineProperty(this, 'stack', {
        value: originalError.stack,
        writable: true,
        configurable: true,
      });
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphQLError);
    } else {
      Object.defineProperty(this, 'stack', {
        value: Error().stack,
        writable: true,
        configurable: true,
      });
    }
    /* c8 ignore stop */
  }

  get [Symbol.toStringTag]() {
    return 'GraphQLError';
  }

  toString() {
    let output = this.message;

    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.loc) {
          output += '\n\n' + printLocation(node.loc);
        }
      }
    } else if (this.source && this.locations) {
      for (const location of this.locations) {
        output += '\n\n' + printSourceLocation(this.source, location);
      }
    }

    return output;
  }

  toJSON() {
    const formattedError = {
      message: this.message,
    };

    if (this.locations != null) {
      formattedError.locations = this.locations;
    }

    if (this.path != null) {
      formattedError.path = this.path;
    }

    if (this.extensions != null && Object.keys(this.extensions).length > 0) {
      formattedError.extensions = this.extensions;
    }

    return formattedError;
  }
}

function undefinedIfEmpty(array) {
  return array === undefined || array.length === 0 ? undefined : array;
}

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */

function syntaxError(source, position, description) {
  return new GraphQLError(`Syntax Error: ${description}`, {
    source,
    positions: [position],
  });
}

/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */
class Location {
  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The Token at which this Node begins.
   */

  /**
   * The Token at which this Node ends.
   */

  /**
   * The Source document the AST represents.
   */
  constructor(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }

  get [Symbol.toStringTag]() {
    return 'Location';
  }

  toJSON() {
    return {
      start: this.start,
      end: this.end,
    };
  }
}
/**
 * Represents a range of characters represented by a lexical token
 * within a Source.
 */

class Token {
  /**
   * The kind of Token.
   */

  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The 1-indexed line number on which this Token appears.
   */

  /**
   * The 1-indexed column number at which this Token begins.
   */

  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */

  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(kind, start, end, line, column, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    this.value = value;
    this.prev = null;
    this.next = null;
  }

  get [Symbol.toStringTag]() {
    return 'Token';
  }

  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column,
    };
  }
}
/**
 * The list of all possible AST node types.
 */

/**
 * @internal
 */
const QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: [
    'name',
    'variableDefinitions',
    'directives',
    'selectionSet',
  ],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: [
    'name', // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    'variableDefinitions',
    'typeCondition',
    'directives',
    'selectionSet',
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['description', 'directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: [
    'description',
    'name',
    'interfaces',
    'directives',
    'fields',
  ],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: [
    'description',
    'name',
    'type',
    'defaultValue',
    'directives',
  ],
  InterfaceTypeDefinition: [
    'description',
    'name',
    'interfaces',
    'directives',
    'fields',
  ],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields'],
};
const kindValues = new Set(Object.keys(QueryDocumentKeys));
/**
 * @internal
 */

function isNode(maybeNode) {
  const maybeKind =
    maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === 'string' && kindValues.has(maybeKind);
}
/** Name */

var OperationTypeNode;

(function (OperationTypeNode) {
  OperationTypeNode['QUERY'] = 'query';
  OperationTypeNode['MUTATION'] = 'mutation';
  OperationTypeNode['SUBSCRIPTION'] = 'subscription';
})(OperationTypeNode || (OperationTypeNode = {}));

/**
 * The set of allowed directive location values.
 */
var DirectiveLocation;

(function (DirectiveLocation) {
  DirectiveLocation['QUERY'] = 'QUERY';
  DirectiveLocation['MUTATION'] = 'MUTATION';
  DirectiveLocation['SUBSCRIPTION'] = 'SUBSCRIPTION';
  DirectiveLocation['FIELD'] = 'FIELD';
  DirectiveLocation['FRAGMENT_DEFINITION'] = 'FRAGMENT_DEFINITION';
  DirectiveLocation['FRAGMENT_SPREAD'] = 'FRAGMENT_SPREAD';
  DirectiveLocation['INLINE_FRAGMENT'] = 'INLINE_FRAGMENT';
  DirectiveLocation['VARIABLE_DEFINITION'] = 'VARIABLE_DEFINITION';
  DirectiveLocation['SCHEMA'] = 'SCHEMA';
  DirectiveLocation['SCALAR'] = 'SCALAR';
  DirectiveLocation['OBJECT'] = 'OBJECT';
  DirectiveLocation['FIELD_DEFINITION'] = 'FIELD_DEFINITION';
  DirectiveLocation['ARGUMENT_DEFINITION'] = 'ARGUMENT_DEFINITION';
  DirectiveLocation['INTERFACE'] = 'INTERFACE';
  DirectiveLocation['UNION'] = 'UNION';
  DirectiveLocation['ENUM'] = 'ENUM';
  DirectiveLocation['ENUM_VALUE'] = 'ENUM_VALUE';
  DirectiveLocation['INPUT_OBJECT'] = 'INPUT_OBJECT';
  DirectiveLocation['INPUT_FIELD_DEFINITION'] = 'INPUT_FIELD_DEFINITION';
})(DirectiveLocation || (DirectiveLocation = {}));
/**
 * The enum type representing the directive location values.
 *
 * @deprecated Please use `DirectiveLocation`. Will be remove in v17.
 */

/**
 * The set of allowed kind values for AST nodes.
 */
var Kind;

(function (Kind) {
  Kind['NAME'] = 'Name';
  Kind['DOCUMENT'] = 'Document';
  Kind['OPERATION_DEFINITION'] = 'OperationDefinition';
  Kind['VARIABLE_DEFINITION'] = 'VariableDefinition';
  Kind['SELECTION_SET'] = 'SelectionSet';
  Kind['FIELD'] = 'Field';
  Kind['ARGUMENT'] = 'Argument';
  Kind['FRAGMENT_SPREAD'] = 'FragmentSpread';
  Kind['INLINE_FRAGMENT'] = 'InlineFragment';
  Kind['FRAGMENT_DEFINITION'] = 'FragmentDefinition';
  Kind['VARIABLE'] = 'Variable';
  Kind['INT'] = 'IntValue';
  Kind['FLOAT'] = 'FloatValue';
  Kind['STRING'] = 'StringValue';
  Kind['BOOLEAN'] = 'BooleanValue';
  Kind['NULL'] = 'NullValue';
  Kind['ENUM'] = 'EnumValue';
  Kind['LIST'] = 'ListValue';
  Kind['OBJECT'] = 'ObjectValue';
  Kind['OBJECT_FIELD'] = 'ObjectField';
  Kind['DIRECTIVE'] = 'Directive';
  Kind['NAMED_TYPE'] = 'NamedType';
  Kind['LIST_TYPE'] = 'ListType';
  Kind['NON_NULL_TYPE'] = 'NonNullType';
  Kind['SCHEMA_DEFINITION'] = 'SchemaDefinition';
  Kind['OPERATION_TYPE_DEFINITION'] = 'OperationTypeDefinition';
  Kind['SCALAR_TYPE_DEFINITION'] = 'ScalarTypeDefinition';
  Kind['OBJECT_TYPE_DEFINITION'] = 'ObjectTypeDefinition';
  Kind['FIELD_DEFINITION'] = 'FieldDefinition';
  Kind['INPUT_VALUE_DEFINITION'] = 'InputValueDefinition';
  Kind['INTERFACE_TYPE_DEFINITION'] = 'InterfaceTypeDefinition';
  Kind['UNION_TYPE_DEFINITION'] = 'UnionTypeDefinition';
  Kind['ENUM_TYPE_DEFINITION'] = 'EnumTypeDefinition';
  Kind['ENUM_VALUE_DEFINITION'] = 'EnumValueDefinition';
  Kind['INPUT_OBJECT_TYPE_DEFINITION'] = 'InputObjectTypeDefinition';
  Kind['DIRECTIVE_DEFINITION'] = 'DirectiveDefinition';
  Kind['SCHEMA_EXTENSION'] = 'SchemaExtension';
  Kind['SCALAR_TYPE_EXTENSION'] = 'ScalarTypeExtension';
  Kind['OBJECT_TYPE_EXTENSION'] = 'ObjectTypeExtension';
  Kind['INTERFACE_TYPE_EXTENSION'] = 'InterfaceTypeExtension';
  Kind['UNION_TYPE_EXTENSION'] = 'UnionTypeExtension';
  Kind['ENUM_TYPE_EXTENSION'] = 'EnumTypeExtension';
  Kind['INPUT_OBJECT_TYPE_EXTENSION'] = 'InputObjectTypeExtension';
})(Kind || (Kind = {}));
/**
 * The enum type representing the possible kind values of AST nodes.
 *
 * @deprecated Please use `Kind`. Will be remove in v17.
 */

/**
 * ```
 * WhiteSpace ::
 *   - "Horizontal Tab (U+0009)"
 *   - "Space (U+0020)"
 * ```
 * @internal
 */
function isWhiteSpace(code) {
  return code === 0x0009 || code === 0x0020;
}
/**
 * ```
 * Digit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 * ```
 * @internal
 */

function isDigit(code) {
  return code >= 0x0030 && code <= 0x0039;
}
/**
 * ```
 * Letter :: one of
 *   - `A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M`
 *   - `N` `O` `P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z`
 *   - `a` `b` `c` `d` `e` `f` `g` `h` `i` `j` `k` `l` `m`
 *   - `n` `o` `p` `q` `r` `s` `t` `u` `v` `w` `x` `y` `z`
 * ```
 * @internal
 */

function isLetter(code) {
  return (
    (code >= 0x0061 && code <= 0x007a) || // A-Z
    (code >= 0x0041 && code <= 0x005a) // a-z
  );
}
/**
 * ```
 * NameStart ::
 *   - Letter
 *   - `_`
 * ```
 * @internal
 */

function isNameStart(code) {
  return isLetter(code) || code === 0x005f;
}
/**
 * ```
 * NameContinue ::
 *   - Letter
 *   - Digit
 *   - `_`
 * ```
 * @internal
 */

function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 0x005f;
}

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */

function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;

  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;

  for (let i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;

    const line = lines[i];
    const indent = leadingWhitespace(line);

    if (indent === line.length) {
      continue; // skip empty lines
    }

    firstNonEmptyLine =
      (_firstNonEmptyLine = firstNonEmptyLine) !== null &&
      _firstNonEmptyLine !== void 0
        ? _firstNonEmptyLine
        : i;
    lastNonEmptyLine = i;

    if (i !== 0 && indent < commonIndent) {
      commonIndent = indent;
    }
  }

  return lines // Remove common indentation from all lines but first.
    .map((line, i) => (i === 0 ? line : line.slice(commonIndent))) // Remove leading and trailing blank lines.
    .slice(
      (_firstNonEmptyLine2 = firstNonEmptyLine) !== null &&
        _firstNonEmptyLine2 !== void 0
        ? _firstNonEmptyLine2
        : 0,
      lastNonEmptyLine + 1,
    );
}

function leadingWhitespace(str) {
  let i = 0;

  while (i < str.length && isWhiteSpace(str.charCodeAt(i))) {
    ++i;
  }

  return i;
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 *
 * @internal
 */

function printBlockString(value, options) {
  const escapedValue = value.replace(/"""/g, '\\"""'); // Expand a block string's raw value into independent lines.

  const lines = escapedValue.split(/\r\n|[\n\r]/g);
  const isSingleLine = lines.length === 1; // If common indentation is found we can fix some of those cases by adding leading new line

  const forceLeadingNewLine =
    lines.length > 1 &&
    lines
      .slice(1)
      .every((line) => line.length === 0 || isWhiteSpace(line.charCodeAt(0))); // Trailing triple quotes just looks confusing but doesn't force trailing new line

  const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""'); // Trailing quote (single or double) or slash forces trailing new line

  const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  const hasTrailingSlash = value.endsWith('\\');
  const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  const printAsMultipleLines =
    // add leading and trailing new lines only if it improves readability
    (!isSingleLine ||
      value.length > 70 ||
      forceTrailingNewline ||
      forceLeadingNewLine ||
      hasTrailingTripleQuotes);
  let result = ''; // Format a multi-line block quote to account for leading space.

  const skipLeadingNewLine = isSingleLine && isWhiteSpace(value.charCodeAt(0));

  if ((printAsMultipleLines && !skipLeadingNewLine) || forceLeadingNewLine) {
    result += '\n';
  }

  result += escapedValue;

  if (printAsMultipleLines || forceTrailingNewline) {
    result += '\n';
  }

  return '"""' + result + '"""';
}

/**
 * An exported enum describing the different kinds of tokens that the
 * lexer emits.
 */
var TokenKind;

(function (TokenKind) {
  TokenKind['SOF'] = '<SOF>';
  TokenKind['EOF'] = '<EOF>';
  TokenKind['BANG'] = '!';
  TokenKind['DOLLAR'] = '$';
  TokenKind['AMP'] = '&';
  TokenKind['PAREN_L'] = '(';
  TokenKind['PAREN_R'] = ')';
  TokenKind['SPREAD'] = '...';
  TokenKind['COLON'] = ':';
  TokenKind['EQUALS'] = '=';
  TokenKind['AT'] = '@';
  TokenKind['BRACKET_L'] = '[';
  TokenKind['BRACKET_R'] = ']';
  TokenKind['BRACE_L'] = '{';
  TokenKind['PIPE'] = '|';
  TokenKind['BRACE_R'] = '}';
  TokenKind['NAME'] = 'Name';
  TokenKind['INT'] = 'Int';
  TokenKind['FLOAT'] = 'Float';
  TokenKind['STRING'] = 'String';
  TokenKind['BLOCK_STRING'] = 'BlockString';
  TokenKind['COMMENT'] = 'Comment';
})(TokenKind || (TokenKind = {}));
/**
 * The enum type representing the token kinds values.
 *
 * @deprecated Please use `TokenKind`. Will be remove in v17.
 */

/**
 * Given a Source object, creates a Lexer for that source.
 * A Lexer is a stateful stream generator in that every time
 * it is advanced, it returns the next token in the Source. Assuming the
 * source lexes, the final Token emitted by the lexer will be of kind
 * EOF, after which the lexer will repeatedly return the same EOF token
 * whenever called.
 */

class Lexer {
  /**
   * The previously focused non-ignored token.
   */

  /**
   * The currently focused non-ignored token.
   */

  /**
   * The (1-indexed) line containing the current token.
   */

  /**
   * The character offset at which the current line begins.
   */
  constructor(source) {
    const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }

  get [Symbol.toStringTag]() {
    return 'Lexer';
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */

  advance() {
    this.lastToken = this.token;
    const token = (this.token = this.lookahead());
    return token;
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */

  lookahead() {
    let token = this.token;

    if (token.kind !== TokenKind.EOF) {
      do {
        if (token.next) {
          token = token.next;
        } else {
          // Read the next token and form a link in the token linked-list.
          const nextToken = readNextToken(this, token.end); // @ts-expect-error next is only mutable during parsing.

          token.next = nextToken; // @ts-expect-error prev is only mutable during parsing.

          nextToken.prev = token;
          token = nextToken;
        }
      } while (token.kind === TokenKind.COMMENT);
    }

    return token;
  }
}
/**
 * @internal
 */

function isPunctuatorTokenKind(kind) {
  return (
    kind === TokenKind.BANG ||
    kind === TokenKind.DOLLAR ||
    kind === TokenKind.AMP ||
    kind === TokenKind.PAREN_L ||
    kind === TokenKind.PAREN_R ||
    kind === TokenKind.SPREAD ||
    kind === TokenKind.COLON ||
    kind === TokenKind.EQUALS ||
    kind === TokenKind.AT ||
    kind === TokenKind.BRACKET_L ||
    kind === TokenKind.BRACKET_R ||
    kind === TokenKind.BRACE_L ||
    kind === TokenKind.PIPE ||
    kind === TokenKind.BRACE_R
  );
}
/**
 * A Unicode scalar value is any Unicode code point except surrogate code
 * points. In other words, the inclusive ranges of values 0x0000 to 0xD7FF and
 * 0xE000 to 0x10FFFF.
 *
 * SourceCharacter ::
 *   - "Any Unicode scalar value"
 */

function isUnicodeScalarValue(code) {
  return (
    (code >= 0x0000 && code <= 0xd7ff) || (code >= 0xe000 && code <= 0x10ffff)
  );
}
/**
 * The GraphQL specification defines source text as a sequence of unicode scalar
 * values (which Unicode defines to exclude surrogate code points). However
 * JavaScript defines strings as a sequence of UTF-16 code units which may
 * include surrogates. A surrogate pair is a valid source character as it
 * encodes a supplementary code point (above U+FFFF), but unpaired surrogate
 * code points are not valid source characters.
 */

function isSupplementaryCodePoint(body, location) {
  return (
    isLeadingSurrogate(body.charCodeAt(location)) &&
    isTrailingSurrogate(body.charCodeAt(location + 1))
  );
}

function isLeadingSurrogate(code) {
  return code >= 0xd800 && code <= 0xdbff;
}

function isTrailingSurrogate(code) {
  return code >= 0xdc00 && code <= 0xdfff;
}
/**
 * Prints the code point (or end of file reference) at a given location in a
 * source for use in error messages.
 *
 * Printable ASCII is printed quoted, while other points are printed in Unicode
 * code point form (ie. U+1234).
 */

function printCodePointAt(lexer, location) {
  const code = lexer.source.body.codePointAt(location);

  if (code === undefined) {
    return TokenKind.EOF;
  } else if (code >= 0x0020 && code <= 0x007e) {
    // Printable ASCII
    const char = String.fromCodePoint(code);
    return char === '"' ? "'\"'" : `"${char}"`;
  } // Unicode code point

  return 'U+' + code.toString(16).toUpperCase().padStart(4, '0');
}
/**
 * Create a token with line and column location information.
 */

function createToken(lexer, kind, start, end, value) {
  const line = lexer.line;
  const col = 1 + start - lexer.lineStart;
  return new Token(kind, start, end, line, col, value);
}
/**
 * Gets the next token from the source starting at the given position.
 *
 * This skips over whitespace until it finds the next lexable token, then lexes
 * punctuators immediately or calls the appropriate helper function for more
 * complicated tokens.
 */

function readNextToken(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start;

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // SourceCharacter

    switch (code) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 0xfeff: // <BOM>

      case 0x0009: // \t

      case 0x0020: // <space>

      case 0x002c:
        // ,
        ++position;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"

      case 0x000a:
        // \n
        ++position;
        ++lexer.line;
        lexer.lineStart = position;
        continue;

      case 0x000d:
        // \r
        if (body.charCodeAt(position + 1) === 0x000a) {
          position += 2;
        } else {
          ++position;
        }

        ++lexer.line;
        lexer.lineStart = position;
        continue;
      // Comment

      case 0x0023:
        // #
        return readComment(lexer, position);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }

      case 0x0021:
        // !
        return createToken(lexer, TokenKind.BANG, position, position + 1);

      case 0x0024:
        // $
        return createToken(lexer, TokenKind.DOLLAR, position, position + 1);

      case 0x0026:
        // &
        return createToken(lexer, TokenKind.AMP, position, position + 1);

      case 0x0028:
        // (
        return createToken(lexer, TokenKind.PAREN_L, position, position + 1);

      case 0x0029:
        // )
        return createToken(lexer, TokenKind.PAREN_R, position, position + 1);

      case 0x002e:
        // .
        if (
          body.charCodeAt(position + 1) === 0x002e &&
          body.charCodeAt(position + 2) === 0x002e
        ) {
          return createToken(lexer, TokenKind.SPREAD, position, position + 3);
        }

        break;

      case 0x003a:
        // :
        return createToken(lexer, TokenKind.COLON, position, position + 1);

      case 0x003d:
        // =
        return createToken(lexer, TokenKind.EQUALS, position, position + 1);

      case 0x0040:
        // @
        return createToken(lexer, TokenKind.AT, position, position + 1);

      case 0x005b:
        // [
        return createToken(lexer, TokenKind.BRACKET_L, position, position + 1);

      case 0x005d:
        // ]
        return createToken(lexer, TokenKind.BRACKET_R, position, position + 1);

      case 0x007b:
        // {
        return createToken(lexer, TokenKind.BRACE_L, position, position + 1);

      case 0x007c:
        // |
        return createToken(lexer, TokenKind.PIPE, position, position + 1);

      case 0x007d:
        // }
        return createToken(lexer, TokenKind.BRACE_R, position, position + 1);
      // StringValue

      case 0x0022:
        // "
        if (
          body.charCodeAt(position + 1) === 0x0022 &&
          body.charCodeAt(position + 2) === 0x0022
        ) {
          return readBlockString(lexer, position);
        }

        return readString(lexer, position);
    } // IntValue | FloatValue (Digit | -)

    if (isDigit(code) || code === 0x002d) {
      return readNumber(lexer, position, code);
    } // Name

    if (isNameStart(code)) {
      return readName(lexer, position);
    }

    throw syntaxError(
      lexer.source,
      position,
      code === 0x0027
        ? 'Unexpected single quote character (\'), did you mean to use a double quote (")?'
        : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position)
        ? `Unexpected character: ${printCodePointAt(lexer, position)}.`
        : `Invalid character: ${printCodePointAt(lexer, position)}.`,
    );
  }

  return createToken(lexer, TokenKind.EOF, bodyLength, bodyLength);
}
/**
 * Reads a comment token from the source file.
 *
 * ```
 * Comment :: # CommentChar* [lookahead != CommentChar]
 *
 * CommentChar :: SourceCharacter but not LineTerminator
 * ```
 */

function readComment(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // LineTerminator (\n | \r)

    if (code === 0x000a || code === 0x000d) {
      break;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }

  return createToken(
    lexer,
    TokenKind.COMMENT,
    start,
    position,
    body.slice(start + 1, position),
  );
}
/**
 * Reads a number token from the source file, either a FloatValue or an IntValue
 * depending on whether a FractionalPart or ExponentPart is encountered.
 *
 * ```
 * IntValue :: IntegerPart [lookahead != {Digit, `.`, NameStart}]
 *
 * IntegerPart ::
 *   - NegativeSign? 0
 *   - NegativeSign? NonZeroDigit Digit*
 *
 * NegativeSign :: -
 *
 * NonZeroDigit :: Digit but not `0`
 *
 * FloatValue ::
 *   - IntegerPart FractionalPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart FractionalPart [lookahead != {Digit, `.`, NameStart}]
 *   - IntegerPart ExponentPart [lookahead != {Digit, `.`, NameStart}]
 *
 * FractionalPart :: . Digit+
 *
 * ExponentPart :: ExponentIndicator Sign? Digit+
 *
 * ExponentIndicator :: one of `e` `E`
 *
 * Sign :: one of + -
 * ```
 */

function readNumber(lexer, start, firstCode) {
  const body = lexer.source.body;
  let position = start;
  let code = firstCode;
  let isFloat = false; // NegativeSign (-)

  if (code === 0x002d) {
    code = body.charCodeAt(++position);
  } // Zero (0)

  if (code === 0x0030) {
    code = body.charCodeAt(++position);

    if (isDigit(code)) {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid number, unexpected digit after 0: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  } else {
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // Full stop (.)

  if (code === 0x002e) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // E e

  if (code === 0x0045 || code === 0x0065) {
    isFloat = true;
    code = body.charCodeAt(++position); // + -

    if (code === 0x002b || code === 0x002d) {
      code = body.charCodeAt(++position);
    }

    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  } // Numbers cannot be followed by . or NameStart

  if (code === 0x002e || isNameStart(code)) {
    throw syntaxError(
      lexer.source,
      position,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        position,
      )}.`,
    );
  }

  return createToken(
    lexer,
    isFloat ? TokenKind.FLOAT : TokenKind.INT,
    start,
    position,
    body.slice(start, position),
  );
}
/**
 * Returns the new position in the source after reading one or more digits.
 */

function readDigits(lexer, start, firstCode) {
  if (!isDigit(firstCode)) {
    throw syntaxError(
      lexer.source,
      start,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        start,
      )}.`,
    );
  }

  const body = lexer.source.body;
  let position = start + 1; // +1 to skip first firstCode

  while (isDigit(body.charCodeAt(position))) {
    ++position;
  }

  return position;
}
/**
 * Reads a single-quote string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `""` [lookahead != `"`]
 *   - `"` StringCharacter+ `"`
 *
 * StringCharacter ::
 *   - SourceCharacter but not `"` or `\` or LineTerminator
 *   - `\u` EscapedUnicode
 *   - `\` EscapedCharacter
 *
 * EscapedUnicode ::
 *   - `{` HexDigit+ `}`
 *   - HexDigit HexDigit HexDigit HexDigit
 *
 * EscapedCharacter :: one of `"` `\` `/` `b` `f` `n` `r` `t`
 * ```
 */

function readString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  let chunkStart = position;
  let value = '';

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // Closing Quote (")

    if (code === 0x0022) {
      value += body.slice(chunkStart, position);
      return createToken(lexer, TokenKind.STRING, start, position + 1, value);
    } // Escape Sequence (\)

    if (code === 0x005c) {
      value += body.slice(chunkStart, position);
      const escape =
        body.charCodeAt(position + 1) === 0x0075 // u
          ? body.charCodeAt(position + 2) === 0x007b // {
            ? readEscapedUnicodeVariableWidth(lexer, position)
            : readEscapedUnicodeFixedWidth(lexer, position)
          : readEscapedCharacter(lexer, position);
      value += escape.value;
      position += escape.size;
      chunkStart = position;
      continue;
    } // LineTerminator (\n | \r)

    if (code === 0x000a || code === 0x000d) {
      break;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  }

  throw syntaxError(lexer.source, position, 'Unterminated string.');
} // The string value and lexed size of an escape sequence.

function readEscapedUnicodeVariableWidth(lexer, position) {
  const body = lexer.source.body;
  let point = 0;
  let size = 3; // Cannot be larger than 12 chars (\u{00000000}).

  while (size < 12) {
    const code = body.charCodeAt(position + size++); // Closing Brace (})

    if (code === 0x007d) {
      // Must be at least 5 chars (\u{0}) and encode a Unicode scalar value.
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }

      return {
        value: String.fromCodePoint(point),
        size,
      };
    } // Append this hex digit to the code point.

    point = (point << 4) | readHexDigit(code);

    if (point < 0) {
      break;
    }
  }

  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(
      position,
      position + size,
    )}".`,
  );
}

function readEscapedUnicodeFixedWidth(lexer, position) {
  const body = lexer.source.body;
  const code = read16BitHexCode(body, position + 2);

  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6,
    };
  } // GraphQL allows JSON-style surrogate pair escape sequences, but only when
  // a valid pair is formed.

  if (isLeadingSurrogate(code)) {
    // \u
    if (
      body.charCodeAt(position + 6) === 0x005c &&
      body.charCodeAt(position + 7) === 0x0075
    ) {
      const trailingCode = read16BitHexCode(body, position + 8);

      if (isTrailingSurrogate(trailingCode)) {
        // JavaScript defines strings as a sequence of UTF-16 code units and
        // encodes Unicode code points above U+FFFF using a surrogate pair of
        // code units. Since this is a surrogate pair escape sequence, just
        // include both codes into the JavaScript string value. Had JavaScript
        // not been internally based on UTF-16, then this surrogate pair would
        // be decoded to retrieve the supplementary code point.
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12,
        };
      }
    }
  }

  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`,
  );
}
/**
 * Reads four hexadecimal characters and returns the positive integer that 16bit
 * hexadecimal string represents. For example, "000f" will return 15, and "dead"
 * will return 57005.
 *
 * Returns a negative number if any char was not a valid hexadecimal digit.
 */

function read16BitHexCode(body, position) {
  // readHexDigit() returns -1 on error. ORing a negative value with any other
  // value always produces a negative value.
  return (
    (readHexDigit(body.charCodeAt(position)) << 12) |
    (readHexDigit(body.charCodeAt(position + 1)) << 8) |
    (readHexDigit(body.charCodeAt(position + 2)) << 4) |
    readHexDigit(body.charCodeAt(position + 3))
  );
}
/**
 * Reads a hexadecimal character and returns its positive integer value (0-15).
 *
 * '0' becomes 0, '9' becomes 9
 * 'A' becomes 10, 'F' becomes 15
 * 'a' becomes 10, 'f' becomes 15
 *
 * Returns -1 if the provided character code was not a valid hexadecimal digit.
 *
 * HexDigit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 *   - `A` `B` `C` `D` `E` `F`
 *   - `a` `b` `c` `d` `e` `f`
 */

function readHexDigit(code) {
  return code >= 0x0030 && code <= 0x0039 // 0-9
    ? code - 0x0030
    : code >= 0x0041 && code <= 0x0046 // A-F
    ? code - 0x0037
    : code >= 0x0061 && code <= 0x0066 // a-f
    ? code - 0x0057
    : -1;
}
/**
 * | Escaped Character | Code Point | Character Name               |
 * | ----------------- | ---------- | ---------------------------- |
 * | `"`               | U+0022     | double quote                 |
 * | `\`               | U+005C     | reverse solidus (back slash) |
 * | `/`               | U+002F     | solidus (forward slash)      |
 * | `b`               | U+0008     | backspace                    |
 * | `f`               | U+000C     | form feed                    |
 * | `n`               | U+000A     | line feed (new line)         |
 * | `r`               | U+000D     | carriage return              |
 * | `t`               | U+0009     | horizontal tab               |
 */

function readEscapedCharacter(lexer, position) {
  const body = lexer.source.body;
  const code = body.charCodeAt(position + 1);

  switch (code) {
    case 0x0022:
      // "
      return {
        value: '\u0022',
        size: 2,
      };

    case 0x005c:
      // \
      return {
        value: '\u005c',
        size: 2,
      };

    case 0x002f:
      // /
      return {
        value: '\u002f',
        size: 2,
      };

    case 0x0062:
      // b
      return {
        value: '\u0008',
        size: 2,
      };

    case 0x0066:
      // f
      return {
        value: '\u000c',
        size: 2,
      };

    case 0x006e:
      // n
      return {
        value: '\u000a',
        size: 2,
      };

    case 0x0072:
      // r
      return {
        value: '\u000d',
        size: 2,
      };

    case 0x0074:
      // t
      return {
        value: '\u0009',
        size: 2,
      };
  }

  throw syntaxError(
    lexer.source,
    position,
    `Invalid character escape sequence: "${body.slice(
      position,
      position + 2,
    )}".`,
  );
}
/**
 * Reads a block string token from the source file.
 *
 * ```
 * StringValue ::
 *   - `"""` BlockStringCharacter* `"""`
 *
 * BlockStringCharacter ::
 *   - SourceCharacter but not `"""` or `\"""`
 *   - `\"""`
 * ```
 */

function readBlockString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let lineStart = lexer.lineStart;
  let position = start + 3;
  let chunkStart = position;
  let currentLine = '';
  const blockLines = [];

  while (position < bodyLength) {
    const code = body.charCodeAt(position); // Closing Triple-Quote (""")

    if (
      code === 0x0022 &&
      body.charCodeAt(position + 1) === 0x0022 &&
      body.charCodeAt(position + 2) === 0x0022
    ) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      const token = createToken(
        lexer,
        TokenKind.BLOCK_STRING,
        start,
        position + 3, // Return a string of the lines joined with U+000A.
        dedentBlockStringLines(blockLines).join('\n'),
      );
      lexer.line += blockLines.length - 1;
      lexer.lineStart = lineStart;
      return token;
    } // Escaped Triple-Quote (\""")

    if (
      code === 0x005c &&
      body.charCodeAt(position + 1) === 0x0022 &&
      body.charCodeAt(position + 2) === 0x0022 &&
      body.charCodeAt(position + 3) === 0x0022
    ) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1; // skip only slash

      position += 4;
      continue;
    } // LineTerminator

    if (code === 0x000a || code === 0x000d) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);

      if (code === 0x000d && body.charCodeAt(position + 1) === 0x000a) {
        position += 2;
      } else {
        ++position;
      }

      currentLine = '';
      chunkStart = position;
      lineStart = position;
      continue;
    } // SourceCharacter

    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position,
        )}.`,
      );
    }
  }

  throw syntaxError(lexer.source, position, 'Unterminated string.');
}
/**
 * Reads an alphanumeric + underscore name from the source.
 *
 * ```
 * Name ::
 *   - NameStart NameContinue* [lookahead != NameContinue]
 * ```
 */

function readName(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;

  while (position < bodyLength) {
    const code = body.charCodeAt(position);

    if (isNameContinue(code)) {
      ++position;
    } else {
      break;
    }
  }

  return createToken(
    lexer,
    TokenKind.NAME,
    start,
    position,
    body.slice(start, position),
  );
}

const MAX_ARRAY_LENGTH = 10;
const MAX_RECURSIVE_DEPTH = 2;
/**
 * Used to print values in error messages.
 */

function inspect(value) {
  return formatValue(value, []);
}

function formatValue(value, seenValues) {
  switch (typeof value) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? `[function ${value.name}]` : '[function]';

    case 'object':
      return formatObjectValue(value, seenValues);

    default:
      return String(value);
  }
}

function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return 'null';
  }

  if (previouslySeenValues.includes(value)) {
    return '[Circular]';
  }

  const seenValues = [...previouslySeenValues, value];

  if (isJSONable(value)) {
    const jsonValue = value.toJSON(); // check for infinite recursion

    if (jsonValue !== value) {
      return typeof jsonValue === 'string'
        ? jsonValue
        : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }

  return formatObject(value, seenValues);
}

function isJSONable(value) {
  return typeof value.toJSON === 'function';
}

function formatObject(object, seenValues) {
  const entries = Object.entries(object);

  if (entries.length === 0) {
    return '{}';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[' + getObjectTag(object) + ']';
  }

  const properties = entries.map(
    ([key, value]) => key + ': ' + formatValue(value, seenValues),
  );
  return '{ ' + properties.join(', ') + ' }';
}

function formatArray(array, seenValues) {
  if (array.length === 0) {
    return '[]';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[Array]';
  }

  const len = Math.min(MAX_ARRAY_LENGTH, array.length);
  const remaining = array.length - len;
  const items = [];

  for (let i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }

  if (remaining === 1) {
    items.push('... 1 more item');
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }

  return '[' + items.join(', ') + ']';
}

function getObjectTag(object) {
  const tag = Object.prototype.toString
    .call(object)
    .replace(/^\[object /, '')
    .replace(/]$/, '');

  if (tag === 'Object' && typeof object.constructor === 'function') {
    const name = object.constructor.name;

    if (typeof name === 'string' && name !== '') {
      return name;
    }
  }

  return tag;
}

/* c8 ignore next 3 */

const isProduction =
  globalThis.process && // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'production';
/**
 * A replacement for instanceof which includes an error warning when multi-realm
 * constructors are detected.
 * See: https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production
 * See: https://webpack.js.org/guides/production/
 */

const instanceOf =
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  isProduction
    ? function instanceOf(value, constructor) {
        return value instanceof constructor;
      }
    : function instanceOf(value, constructor) {
        if (value instanceof constructor) {
          return true;
        }

        if (typeof value === 'object' && value !== null) {
          var _value$constructor;

          // Prefer Symbol.toStringTag since it is immune to minification.
          const className = constructor.prototype[Symbol.toStringTag];
          const valueClassName = // We still need to support constructor's name to detect conflicts with older versions of this library.
            Symbol.toStringTag in value // @ts-expect-error TS bug see, https://github.com/microsoft/TypeScript/issues/38009
              ? value[Symbol.toStringTag]
              : (_value$constructor = value.constructor) === null ||
                _value$constructor === void 0
              ? void 0
              : _value$constructor.name;

          if (className === valueClassName) {
            const stringifiedValue = inspect(value);
            throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
          }
        }

        return false;
      };

/**
 * A representation of source input to GraphQL. The `name` and `locationOffset` parameters are
 * optional, but they are useful for clients who store GraphQL documents in source files.
 * For example, if the GraphQL input starts at line 40 in a file named `Foo.graphql`, it might
 * be useful for `name` to be `"Foo.graphql"` and location to be `{ line: 40, column: 1 }`.
 * The `line` and `column` properties in `locationOffset` are 1-indexed.
 */
class Source {
  constructor(
    body,
    name = 'GraphQL request',
    locationOffset = {
      line: 1,
      column: 1,
    },
  ) {
    typeof body === 'string' ||
      devAssert(false, `Body must be a string. Received: ${inspect(body)}.`);
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 ||
      devAssert(
        false,
        'line in locationOffset is 1-indexed and must be positive.',
      );
    this.locationOffset.column > 0 ||
      devAssert(
        false,
        'column in locationOffset is 1-indexed and must be positive.',
      );
  }

  get [Symbol.toStringTag]() {
    return 'Source';
  }
}
/**
 * Test if the given value is a Source object.
 *
 * @internal
 */

function isSource(source) {
  return instanceOf(source, Source);
}

/**
 * Configuration options to control parser behavior
 */

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */
function parse(source, options) {
  const parser = new Parser(source, options);
  return parser.parseDocument();
}
/**
 * This class is exported only to assist people in implementing their own parsers
 * without duplicating too much code and should be used only as last resort for cases
 * such as experimental syntax or if certain features could not be contributed upstream.
 *
 * It is still part of the internal API and is versioned, so any changes to it are never
 * considered breaking changes. If you still need to support multiple versions of the
 * library, please use the `versionInfo` variable for version detection.
 *
 * @internal
 */

class Parser {
  constructor(source, options = {}) {
    const sourceObj = isSource(source) ? source : new Source(source);
    this._lexer = new Lexer(sourceObj);
    this._options = options;
    this._tokenCounter = 0;
  }
  /**
   * Converts a name lex token into a name parse node.
   */

  parseName() {
    const token = this.expectToken(TokenKind.NAME);
    return this.node(token, {
      kind: Kind.NAME,
      value: token.value,
    });
  } // Implements the parsing rules in the Document section.

  /**
   * Document : Definition+
   */

  parseDocument() {
    return this.node(this._lexer.token, {
      kind: Kind.DOCUMENT,
      definitions: this.many(
        TokenKind.SOF,
        this.parseDefinition,
        TokenKind.EOF,
      ),
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */

  parseDefinition() {
    if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    } // Many definitions begin with a description and require a lookahead.

    const hasDescription = this.peekDescription();
    const keywordToken = hasDescription
      ? this._lexer.lookahead()
      : this._lexer.token;

    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaDefinition();

        case 'scalar':
          return this.parseScalarTypeDefinition();

        case 'type':
          return this.parseObjectTypeDefinition();

        case 'interface':
          return this.parseInterfaceTypeDefinition();

        case 'union':
          return this.parseUnionTypeDefinition();

        case 'enum':
          return this.parseEnumTypeDefinition();

        case 'input':
          return this.parseInputObjectTypeDefinition();

        case 'directive':
          return this.parseDirectiveDefinition();
      }

      if (hasDescription) {
        throw syntaxError(
          this._lexer.source,
          this._lexer.token.start,
          'Unexpected description, descriptions are supported only on type definitions.',
        );
      }

      switch (keywordToken.value) {
        case 'query':
        case 'mutation':
        case 'subscription':
          return this.parseOperationDefinition();

        case 'fragment':
          return this.parseFragmentDefinition();

        case 'extend':
          return this.parseTypeSystemExtension();
      }
    }

    throw this.unexpected(keywordToken);
  } // Implements the parsing rules in the Operations section.

  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */

  parseOperationDefinition() {
    const start = this._lexer.token;

    if (this.peek(TokenKind.BRACE_L)) {
      return this.node(start, {
        kind: Kind.OPERATION_DEFINITION,
        operation: OperationTypeNode.QUERY,
        name: undefined,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
      });
    }

    const operation = this.parseOperationType();
    let name;

    if (this.peek(TokenKind.NAME)) {
      name = this.parseName();
    }

    return this.node(start, {
      kind: Kind.OPERATION_DEFINITION,
      operation,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */

  parseOperationType() {
    const operationToken = this.expectToken(TokenKind.NAME);

    switch (operationToken.value) {
      case 'query':
        return OperationTypeNode.QUERY;

      case 'mutation':
        return OperationTypeNode.MUTATION;

      case 'subscription':
        return OperationTypeNode.SUBSCRIPTION;
    }

    throw this.unexpected(operationToken);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */

  parseVariableDefinitions() {
    return this.optionalMany(
      TokenKind.PAREN_L,
      this.parseVariableDefinition,
      TokenKind.PAREN_R,
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */

  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS)
        ? this.parseConstValueLiteral()
        : undefined,
      directives: this.parseConstDirectives(),
    });
  }
  /**
   * Variable : $ Name
   */

  parseVariable() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return this.node(start, {
      kind: Kind.VARIABLE,
      name: this.parseName(),
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */

  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: Kind.SELECTION_SET,
      selections: this.many(
        TokenKind.BRACE_L,
        this.parseSelection,
        TokenKind.BRACE_R,
      ),
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */

  parseSelection() {
    return this.peek(TokenKind.SPREAD)
      ? this.parseFragment()
      : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */

  parseField() {
    const start = this._lexer.token;
    const nameOrAlias = this.parseName();
    let alias;
    let name;

    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }

    return this.node(start, {
      kind: Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L)
        ? this.parseSelectionSet()
        : undefined,
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */

  parseArguments(isConst) {
    const item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */

  parseArgument(isConst = false) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(isConst),
    });
  }

  parseConstArgument() {
    return this.parseArgument(true);
  } // Implements the parsing rules in the Fragments section.

  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */

  parseFragment() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    const hasTypeCondition = this.expectOptionalKeyword('on');

    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return this.node(start, {
        kind: Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false),
      });
    }

    return this.node(start, {
      kind: Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */

  parseFragmentDefinition() {
    const start = this._lexer.token;
    this.expectKeyword('fragment'); // Legacy support for defining variables within fragments changes
    // the grammar of FragmentDefinition:
    //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet

    if (this._options.allowLegacyFragmentVariables === true) {
      return this.node(start, {
        kind: Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet(),
      });
    }

    return this.node(start, {
      kind: Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword('on'), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet(),
    });
  }
  /**
   * FragmentName : Name but not `on`
   */

  parseFragmentName() {
    if (this._lexer.token.value === 'on') {
      throw this.unexpected();
    }

    return this.parseName();
  } // Implements the parsing rules in the Values section.

  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */

  parseValueLiteral(isConst) {
    const token = this._lexer.token;

    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);

      case TokenKind.BRACE_L:
        return this.parseObject(isConst);

      case TokenKind.INT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.INT,
          value: token.value,
        });

      case TokenKind.FLOAT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.FLOAT,
          value: token.value,
        });

      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();

      case TokenKind.NAME:
        this.advanceLexer();

        switch (token.value) {
          case 'true':
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: true,
            });

          case 'false':
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: false,
            });

          case 'null':
            return this.node(token, {
              kind: Kind.NULL,
            });

          default:
            return this.node(token, {
              kind: Kind.ENUM,
              value: token.value,
            });
        }

      case TokenKind.DOLLAR:
        if (isConst) {
          this.expectToken(TokenKind.DOLLAR);

          if (this._lexer.token.kind === TokenKind.NAME) {
            const varName = this._lexer.token.value;
            throw syntaxError(
              this._lexer.source,
              token.start,
              `Unexpected variable "$${varName}" in constant value.`,
            );
          } else {
            throw this.unexpected(token);
          }
        }

        return this.parseVariable();

      default:
        throw this.unexpected();
    }
  }

  parseConstValueLiteral() {
    return this.parseValueLiteral(true);
  }

  parseStringLiteral() {
    const token = this._lexer.token;
    this.advanceLexer();
    return this.node(token, {
      kind: Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING,
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */

  parseList(isConst) {
    const item = () => this.parseValueLiteral(isConst);

    return this.node(this._lexer.token, {
      kind: Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */

  parseObject(isConst) {
    const item = () => this.parseObjectField(isConst);

    return this.node(this._lexer.token, {
      kind: Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R),
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */

  parseObjectField(isConst) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst),
    });
  } // Implements the parsing rules in the Directives section.

  /**
   * Directives[Const] : Directive[?Const]+
   */

  parseDirectives(isConst) {
    const directives = [];

    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }

    return directives;
  }

  parseConstDirectives() {
    return this.parseDirectives(true);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */

  parseDirective(isConst) {
    const start = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return this.node(start, {
      kind: Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst),
    });
  } // Implements the parsing rules in the Types section.

  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */

  parseTypeReference() {
    const start = this._lexer.token;
    let type;

    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      const innerType = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = this.node(start, {
        kind: Kind.LIST_TYPE,
        type: innerType,
      });
    } else {
      type = this.parseNamedType();
    }

    if (this.expectOptionalToken(TokenKind.BANG)) {
      return this.node(start, {
        kind: Kind.NON_NULL_TYPE,
        type,
      });
    }

    return type;
  }
  /**
   * NamedType : Name
   */

  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: Kind.NAMED_TYPE,
      name: this.parseName(),
    });
  } // Implements the parsing rules in the Type Definition section.

  peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */

  parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */

  parseSchemaDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('schema');
    const directives = this.parseConstDirectives();
    const operationTypes = this.many(
      TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      TokenKind.BRACE_R,
    );
    return this.node(start, {
      kind: Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes,
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */

  parseOperationTypeDefinition() {
    const start = this._lexer.token;
    const operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    const type = this.parseNamedType();
    return this.node(start, {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type,
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */

  parseScalarTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('scalar');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives,
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */

  parseObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('type');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */

  parseImplementsInterfaces() {
    return this.expectOptionalKeyword('implements')
      ? this.delimitedMany(TokenKind.AMP, this.parseNamedType)
      : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */

  parseFieldsDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseFieldDefinition,
      TokenKind.BRACE_R,
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */

  parseFieldDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives,
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */

  parseArgumentDefs() {
    return this.optionalMany(
      TokenKind.PAREN_L,
      this.parseInputValueDef,
      TokenKind.PAREN_R,
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */

  parseInputValueDef() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    let defaultValue;

    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseConstValueLiteral();
    }

    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives,
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */

  parseInterfaceTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('interface');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */

  parseUnionTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('union');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();
    return this.node(start, {
      kind: Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types,
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */

  parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS)
      ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType)
      : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */

  parseEnumTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('enum');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    return this.node(start, {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values,
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */

  parseEnumValuesDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseEnumValueDefinition,
      TokenKind.BRACE_R,
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */

  parseEnumValueDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseEnumValueName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives,
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */

  parseEnumValueName() {
    if (
      this._lexer.token.value === 'true' ||
      this._lexer.token.value === 'false' ||
      this._lexer.token.value === 'null'
    ) {
      throw syntaxError(
        this._lexer.source,
        this._lexer.token.start,
        `${getTokenDesc(
          this._lexer.token,
        )} is reserved and cannot be used for an enum value.`,
      );
    }

    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */

  parseInputObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('input');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields,
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */

  parseInputFieldsDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseInputValueDef,
      TokenKind.BRACE_R,
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */

  parseTypeSystemExtension() {
    const keywordToken = this._lexer.lookahead();

    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case 'schema':
          return this.parseSchemaExtension();

        case 'scalar':
          return this.parseScalarTypeExtension();

        case 'type':
          return this.parseObjectTypeExtension();

        case 'interface':
          return this.parseInterfaceTypeExtension();

        case 'union':
          return this.parseUnionTypeExtension();

        case 'enum':
          return this.parseEnumTypeExtension();

        case 'input':
          return this.parseInputObjectTypeExtension();
      }
    }

    throw this.unexpected(keywordToken);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */

  parseSchemaExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('schema');
    const directives = this.parseConstDirectives();
    const operationTypes = this.optionalMany(
      TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      TokenKind.BRACE_R,
    );

    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes,
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */

  parseScalarTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('scalar');
    const name = this.parseName();
    const directives = this.parseConstDirectives();

    if (directives.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives,
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */

  parseObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('type');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();

    if (
      interfaces.length === 0 &&
      directives.length === 0 &&
      fields.length === 0
    ) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */

  parseInterfaceTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('interface');
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();

    if (
      interfaces.length === 0 &&
      directives.length === 0 &&
      fields.length === 0
    ) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields,
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */

  parseUnionTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('union');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();

    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types,
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */

  parseEnumTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('enum');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();

    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values,
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */

  parseInputObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword('extend');
    this.expectKeyword('input');
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();

    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }

    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields,
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */

  parseDirectiveDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword('directive');
    this.expectToken(TokenKind.AT);
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    const repeatable = this.expectOptionalKeyword('repeatable');
    this.expectKeyword('on');
    const locations = this.parseDirectiveLocations();
    return this.node(start, {
      kind: Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations,
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */

  parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */

  parseDirectiveLocation() {
    const start = this._lexer.token;
    const name = this.parseName();

    if (Object.prototype.hasOwnProperty.call(DirectiveLocation, name.value)) {
      return name;
    }

    throw this.unexpected(start);
  } // Core parsing utility functions

  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */

  node(startToken, node) {
    if (this._options.noLocation !== true) {
      node.loc = new Location(
        startToken,
        this._lexer.lastToken,
        this._lexer.source,
      );
    }

    return node;
  }
  /**
   * Determines if the next token is of a given kind
   */

  peek(kind) {
    return this._lexer.token.kind === kind;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */

  expectToken(kind) {
    const token = this._lexer.token;

    if (token.kind === kind) {
      this.advanceLexer();
      return token;
    }

    throw syntaxError(
      this._lexer.source,
      token.start,
      `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`,
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */

  expectOptionalToken(kind) {
    const token = this._lexer.token;

    if (token.kind === kind) {
      this.advanceLexer();
      return true;
    }

    return false;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */

  expectKeyword(value) {
    const token = this._lexer.token;

    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
    } else {
      throw syntaxError(
        this._lexer.source,
        token.start,
        `Expected "${value}", found ${getTokenDesc(token)}.`,
      );
    }
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */

  expectOptionalKeyword(value) {
    const token = this._lexer.token;

    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
      return true;
    }

    return false;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */

  unexpected(atToken) {
    const token =
      atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return syntaxError(
      this._lexer.source,
      token.start,
      `Unexpected ${getTokenDesc(token)}.`,
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];

    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }

    return nodes;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      const nodes = [];

      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));

      return nodes;
    }

    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */

  many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));

    return nodes;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */

  delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    const nodes = [];

    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));

    return nodes;
  }

  advanceLexer() {
    const { maxTokens } = this._options;

    const token = this._lexer.advance();

    if (maxTokens !== undefined && token.kind !== TokenKind.EOF) {
      ++this._tokenCounter;

      if (this._tokenCounter > maxTokens) {
        throw syntaxError(
          this._lexer.source,
          token.start,
          `Document contains more that ${maxTokens} tokens. Parsing aborted.`,
        );
      }
    }
  }
}
/**
 * A helper function to describe a token as a string for debugging.
 */

function getTokenDesc(token) {
  const value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : '');
}
/**
 * A helper function to describe a token kind as a string for debugging.
 */

function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind;
}

/**
 * Prints a string as a GraphQL StringValue literal. Replaces control characters
 * and excluded characters (" U+0022 and \\ U+005C) with escape sequences.
 */
function printString(str) {
  return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
} // eslint-disable-next-line no-control-regex

const escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;

function escapedReplacer(str) {
  return escapeSequences[str.charCodeAt(0)];
} // prettier-ignore

const escapeSequences = [
  '\\u0000',
  '\\u0001',
  '\\u0002',
  '\\u0003',
  '\\u0004',
  '\\u0005',
  '\\u0006',
  '\\u0007',
  '\\b',
  '\\t',
  '\\n',
  '\\u000B',
  '\\f',
  '\\r',
  '\\u000E',
  '\\u000F',
  '\\u0010',
  '\\u0011',
  '\\u0012',
  '\\u0013',
  '\\u0014',
  '\\u0015',
  '\\u0016',
  '\\u0017',
  '\\u0018',
  '\\u0019',
  '\\u001A',
  '\\u001B',
  '\\u001C',
  '\\u001D',
  '\\u001E',
  '\\u001F',
  '',
  '',
  '\\"',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 2F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 3F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 4F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '\\\\',
  '',
  '',
  '', // 5F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 6F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '\\u007F',
  '\\u0080',
  '\\u0081',
  '\\u0082',
  '\\u0083',
  '\\u0084',
  '\\u0085',
  '\\u0086',
  '\\u0087',
  '\\u0088',
  '\\u0089',
  '\\u008A',
  '\\u008B',
  '\\u008C',
  '\\u008D',
  '\\u008E',
  '\\u008F',
  '\\u0090',
  '\\u0091',
  '\\u0092',
  '\\u0093',
  '\\u0094',
  '\\u0095',
  '\\u0096',
  '\\u0097',
  '\\u0098',
  '\\u0099',
  '\\u009A',
  '\\u009B',
  '\\u009C',
  '\\u009D',
  '\\u009E',
  '\\u009F',
];

/**
 * A visitor is provided to visit, it contains the collection of
 * relevant functions to be called during the visitor's traversal.
 */

const BREAK = Object.freeze({});
/**
 * visit() will walk through an AST using a depth-first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 * ```ts
 * const editedAST = visit(ast, {
 *   enter(node, key, parent, path, ancestors) {
 *     // @return
 *     //   undefined: no action
 *     //   false: skip visiting this node
 *     //   visitor.BREAK: stop visiting altogether
 *     //   null: delete this node
 *     //   any value: replace this node with the returned value
 *   },
 *   leave(node, key, parent, path, ancestors) {
 *     // @return
 *     //   undefined: no action
 *     //   false: no action
 *     //   visitor.BREAK: stop visiting altogether
 *     //   null: delete this node
 *     //   any value: replace this node with the returned value
 *   }
 * });
 * ```
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to three permutations of the
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node of a specific kind.
 *
 * ```ts
 * visit(ast, {
 *   Kind(node) {
 *     // enter the "Kind" node
 *   }
 * })
 * ```
 *
 * 2) Named visitors that trigger upon entering and leaving a node of a specific kind.
 *
 * ```ts
 * visit(ast, {
 *   Kind: {
 *     enter(node) {
 *       // enter the "Kind" node
 *     }
 *     leave(node) {
 *       // leave the "Kind" node
 *     }
 *   }
 * })
 * ```
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 * ```ts
 * visit(ast, {
 *   enter(node) {
 *     // enter any node
 *   },
 *   leave(node) {
 *     // leave any node
 *   }
 * })
 * ```
 */

function visit(root, visitor, visitorKeys = QueryDocumentKeys) {
  const enterLeaveMap = new Map();

  for (const kind of Object.values(Kind)) {
    enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
  }
  /* eslint-disable no-undef-init */

  let stack = undefined;
  let inArray = Array.isArray(root);
  let keys = [root];
  let index = -1;
  let edits = [];
  let node = root;
  let key = undefined;
  let parent = undefined;
  const path = [];
  const ancestors = [];
  /* eslint-enable no-undef-init */

  do {
    index++;
    const isLeaving = index === keys.length;
    const isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
          let editOffset = 0;

          for (const [editKey, editValue] of edits) {
            const arrayKey = editKey - editOffset;

            if (editValue === null) {
              node.splice(arrayKey, 1);
              editOffset++;
            } else {
              node[arrayKey] = editValue;
            }
          }
        } else {
          node = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(node),
          );

          for (const [editKey, editValue] of edits) {
            node[editKey] = editValue;
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else if (parent) {
      key = inArray ? index : keys[index];
      node = parent[key];

      if (node === null || node === undefined) {
        continue;
      }

      path.push(key);
    }

    let result;

    if (!Array.isArray(node)) {
      var _enterLeaveMap$get, _enterLeaveMap$get2;

      isNode(node) || devAssert(false, `Invalid AST Node: ${inspect(node)}.`);
      const visitFn = isLeaving
        ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null ||
          _enterLeaveMap$get === void 0
          ? void 0
          : _enterLeaveMap$get.leave
        : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null ||
          _enterLeaveMap$get2 === void 0
        ? void 0
        : _enterLeaveMap$get2.enter;
      result =
        visitFn === null || visitFn === void 0
          ? void 0
          : visitFn.call(visitor, node, key, parent, path, ancestors);

      if (result === BREAK) {
        break;
      }

      if (result === false) {
        if (!isLeaving) {
          path.pop();
          continue;
        }
      } else if (result !== undefined) {
        edits.push([key, result]);

        if (!isLeaving) {
          if (isNode(result)) {
            node = result;
          } else {
            path.pop();
            continue;
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      var _node$kind;

      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack,
      };
      inArray = Array.isArray(node);
      keys = inArray
        ? node
        : (_node$kind = visitorKeys[node.kind]) !== null &&
          _node$kind !== void 0
        ? _node$kind
        : [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    // New root
    return edits[edits.length - 1][1];
  }

  return root;
}
/**
 * Given a visitor instance and a node kind, return EnterLeaveVisitor for that kind.
 */

function getEnterLeaveForKind(visitor, kind) {
  const kindVisitor = visitor[kind];

  if (typeof kindVisitor === 'object') {
    // { Kind: { enter() {}, leave() {} } }
    return kindVisitor;
  } else if (typeof kindVisitor === 'function') {
    // { Kind() {} }
    return {
      enter: kindVisitor,
      leave: undefined,
    };
  } // { enter() {}, leave() {} }

  return {
    enter: visitor.enter,
    leave: visitor.leave,
  };
}

/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */

function print(ast) {
  return visit(ast, printDocASTReducer);
}
const MAX_LINE_LENGTH = 80;
const printDocASTReducer = {
  Name: {
    leave: (node) => node.value,
  },
  Variable: {
    leave: (node) => '$' + node.name,
  },
  // Document
  Document: {
    leave: (node) => join(node.definitions, '\n\n'),
  },
  OperationDefinition: {
    leave(node) {
      const varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
      const prefix = join(
        [
          node.operation,
          join([node.name, varDefs]),
          join(node.directives, ' '),
        ],
        ' ',
      ); // Anonymous queries with no directives or variable definitions can use
      // the query short form.

      return (prefix === 'query' ? '' : prefix + ' ') + node.selectionSet;
    },
  },
  VariableDefinition: {
    leave: ({ variable, type, defaultValue, directives }) =>
      variable +
      ': ' +
      type +
      wrap(' = ', defaultValue) +
      wrap(' ', join(directives, ' ')),
  },
  SelectionSet: {
    leave: ({ selections }) => block(selections),
  },
  Field: {
    leave({ alias, name, arguments: args, directives, selectionSet }) {
      const prefix = wrap('', alias, ': ') + name;
      let argsLine = prefix + wrap('(', join(args, ', '), ')');

      if (argsLine.length > MAX_LINE_LENGTH) {
        argsLine = prefix + wrap('(\n', indent(join(args, '\n')), '\n)');
      }

      return join([argsLine, join(directives, ' '), selectionSet], ' ');
    },
  },
  Argument: {
    leave: ({ name, value }) => name + ': ' + value,
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name, directives }) =>
      '...' + name + wrap(' ', join(directives, ' ')),
  },
  InlineFragment: {
    leave: ({ typeCondition, directives, selectionSet }) =>
      join(
        [
          '...',
          wrap('on ', typeCondition),
          join(directives, ' '),
          selectionSet,
        ],
        ' ',
      ),
  },
  FragmentDefinition: {
    leave: (
      { name, typeCondition, variableDefinitions, directives, selectionSet }, // Note: fragment variable definitions are experimental and may be changed
    ) =>
      // or removed in the future.
      `fragment ${name}${wrap('(', join(variableDefinitions, ', '), ')')} ` +
      `on ${typeCondition} ${wrap('', join(directives, ' '), ' ')}` +
      selectionSet,
  },
  // Value
  IntValue: {
    leave: ({ value }) => value,
  },
  FloatValue: {
    leave: ({ value }) => value,
  },
  StringValue: {
    leave: ({ value, block: isBlockString }) =>
      isBlockString ? printBlockString(value) : printString(value),
  },
  BooleanValue: {
    leave: ({ value }) => (value ? 'true' : 'false'),
  },
  NullValue: {
    leave: () => 'null',
  },
  EnumValue: {
    leave: ({ value }) => value,
  },
  ListValue: {
    leave: ({ values }) => '[' + join(values, ', ') + ']',
  },
  ObjectValue: {
    leave: ({ fields }) => '{' + join(fields, ', ') + '}',
  },
  ObjectField: {
    leave: ({ name, value }) => name + ': ' + value,
  },
  // Directive
  Directive: {
    leave: ({ name, arguments: args }) =>
      '@' + name + wrap('(', join(args, ', '), ')'),
  },
  // Type
  NamedType: {
    leave: ({ name }) => name,
  },
  ListType: {
    leave: ({ type }) => '[' + type + ']',
  },
  NonNullType: {
    leave: ({ type }) => type + '!',
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description, directives, operationTypes }) =>
      wrap('', description, '\n') +
      join(['schema', join(directives, ' '), block(operationTypes)], ' '),
  },
  OperationTypeDefinition: {
    leave: ({ operation, type }) => operation + ': ' + type,
  },
  ScalarTypeDefinition: {
    leave: ({ description, name, directives }) =>
      wrap('', description, '\n') +
      join(['scalar', name, join(directives, ' ')], ' '),
  },
  ObjectTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) =>
      wrap('', description, '\n') +
      join(
        [
          'type',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  FieldDefinition: {
    leave: ({ description, name, arguments: args, type, directives }) =>
      wrap('', description, '\n') +
      name +
      (hasMultilineItems(args)
        ? wrap('(\n', indent(join(args, '\n')), '\n)')
        : wrap('(', join(args, ', '), ')')) +
      ': ' +
      type +
      wrap(' ', join(directives, ' ')),
  },
  InputValueDefinition: {
    leave: ({ description, name, type, defaultValue, directives }) =>
      wrap('', description, '\n') +
      join(
        [name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')],
        ' ',
      ),
  },
  InterfaceTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) =>
      wrap('', description, '\n') +
      join(
        [
          'interface',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  UnionTypeDefinition: {
    leave: ({ description, name, directives, types }) =>
      wrap('', description, '\n') +
      join(
        ['union', name, join(directives, ' '), wrap('= ', join(types, ' | '))],
        ' ',
      ),
  },
  EnumTypeDefinition: {
    leave: ({ description, name, directives, values }) =>
      wrap('', description, '\n') +
      join(['enum', name, join(directives, ' '), block(values)], ' '),
  },
  EnumValueDefinition: {
    leave: ({ description, name, directives }) =>
      wrap('', description, '\n') + join([name, join(directives, ' ')], ' '),
  },
  InputObjectTypeDefinition: {
    leave: ({ description, name, directives, fields }) =>
      wrap('', description, '\n') +
      join(['input', name, join(directives, ' '), block(fields)], ' '),
  },
  DirectiveDefinition: {
    leave: ({ description, name, arguments: args, repeatable, locations }) =>
      wrap('', description, '\n') +
      'directive @' +
      name +
      (hasMultilineItems(args)
        ? wrap('(\n', indent(join(args, '\n')), '\n)')
        : wrap('(', join(args, ', '), ')')) +
      (repeatable ? ' repeatable' : '') +
      ' on ' +
      join(locations, ' | '),
  },
  SchemaExtension: {
    leave: ({ directives, operationTypes }) =>
      join(
        ['extend schema', join(directives, ' '), block(operationTypes)],
        ' ',
      ),
  },
  ScalarTypeExtension: {
    leave: ({ name, directives }) =>
      join(['extend scalar', name, join(directives, ' ')], ' '),
  },
  ObjectTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) =>
      join(
        [
          'extend type',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  InterfaceTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) =>
      join(
        [
          'extend interface',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  UnionTypeExtension: {
    leave: ({ name, directives, types }) =>
      join(
        [
          'extend union',
          name,
          join(directives, ' '),
          wrap('= ', join(types, ' | ')),
        ],
        ' ',
      ),
  },
  EnumTypeExtension: {
    leave: ({ name, directives, values }) =>
      join(['extend enum', name, join(directives, ' '), block(values)], ' '),
  },
  InputObjectTypeExtension: {
    leave: ({ name, directives, fields }) =>
      join(['extend input', name, join(directives, ' '), block(fields)], ' '),
  },
};
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */

function join(maybeArray, separator = '') {
  var _maybeArray$filter$jo;

  return (_maybeArray$filter$jo =
    maybeArray === null || maybeArray === void 0
      ? void 0
      : maybeArray.filter((x) => x).join(separator)) !== null &&
    _maybeArray$filter$jo !== void 0
    ? _maybeArray$filter$jo
    : '';
}
/**
 * Given array, print each item on its own line, wrapped in an indented `{ }` block.
 */

function block(array) {
  return wrap('{\n', indent(join(array, '\n')), '\n}');
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise print an empty string.
 */

function wrap(start, maybeString, end = '') {
  return maybeString != null && maybeString !== ''
    ? start + maybeString + end
    : '';
}

function indent(str) {
  return wrap('  ', str.replace(/\n/g, '\n  '));
}

function hasMultilineItems(maybeArray) {
  var _maybeArray$some;

  // FIXME: https://github.com/graphql/graphql-js/issues/2203

  /* c8 ignore next */
  return (_maybeArray$some =
    maybeArray === null || maybeArray === void 0
      ? void 0
      : maybeArray.some((str) => str.includes('\n'))) !== null &&
    _maybeArray$some !== void 0
    ? _maybeArray$some
    : false;
}

/**
 * helpers
 */
const extractOperationName = (document) => {
    let operationName = undefined;
    const operationDefinitions = document.definitions.filter((definition) => definition.kind === `OperationDefinition`);
    if (operationDefinitions.length === 1) {
        operationName = operationDefinitions[0]?.name?.value;
    }
    return operationName;
};
const resolveRequestDocument = (document) => {
    if (typeof document === `string`) {
        let operationName = undefined;
        try {
            const parsedDocument = parse(document);
            operationName = extractOperationName(parsedDocument);
        }
        catch (err) {
            // Failed parsing the document, the operationName will be undefined
        }
        return { query: document, operationName };
    }
    const operationName = extractOperationName(document);
    return { query: print(document), operationName };
};

class ClientError extends Error {
    constructor(response, request) {
        const message = `${ClientError.extractMessage(response)}: ${JSON.stringify({
            response,
            request,
        })}`;
        super(message);
        Object.setPrototypeOf(this, ClientError.prototype);
        this.response = response;
        this.request = request;
        // this is needed as Safari doesn't support .captureStackTrace
        if (typeof Error.captureStackTrace === `function`) {
            Error.captureStackTrace(this, ClientError);
        }
    }
    static extractMessage(response) {
        return response.errors?.[0]?.message ?? `GraphQL Error (Code: ${response.status})`;
    }
}

/**
 * Convert the given headers configuration into a plain object.
 */
const resolveHeaders = (headers) => {
    let oHeaders = {};
    if (headers) {
        if ((typeof Headers !== `undefined` && headers instanceof Headers) ||
            (CrossFetch && CrossFetch.Headers && headers instanceof CrossFetch.Headers)) {
            oHeaders = HeadersInstanceToPlainObject(headers);
        }
        else if (Array.isArray(headers)) {
            headers.forEach(([name, value]) => {
                if (name && value !== undefined) {
                    oHeaders[name] = value;
                }
            });
        }
        else {
            oHeaders = headers;
        }
    }
    return oHeaders;
};
/**
 * Clean a GraphQL document to send it via a GET query
 */
const cleanQuery = (str) => str.replace(/([\s,]|#[^\n\r]+)+/g, ` `).trim();
/**
 * Create query string for GraphQL request
 */
const buildRequestConfig = (params) => {
    if (!Array.isArray(params.query)) {
        const params_ = params;
        const search = [`query=${encodeURIComponent(cleanQuery(params_.query))}`];
        if (params.variables) {
            search.push(`variables=${encodeURIComponent(params_.jsonSerializer.stringify(params_.variables))}`);
        }
        if (params_.operationName) {
            search.push(`operationName=${encodeURIComponent(params_.operationName)}`);
        }
        return search.join(`&`);
    }
    if (typeof params.variables !== `undefined` && !Array.isArray(params.variables)) {
        throw new Error(`Cannot create query with given variable type, array expected`);
    }
    // Batch support
    const params_ = params;
    const payload = params.query.reduce((acc, currentQuery, index) => {
        acc.push({
            query: cleanQuery(currentQuery),
            variables: params_.variables ? params_.jsonSerializer.stringify(params_.variables[index]) : undefined,
        });
        return acc;
    }, []);
    return `query=${encodeURIComponent(params_.jsonSerializer.stringify(payload))}`;
};
const createHttpMethodFetcher = (method) => async (params) => {
    const { url, query, variables, operationName, fetch, fetchOptions, middleware } = params;
    const headers = { ...params.headers };
    let queryParams = ``;
    let body = undefined;
    if (method === `POST`) {
        body = createRequestBody(query, variables, operationName, fetchOptions.jsonSerializer);
        if (typeof body === `string`) {
            // @ts-expect-error todo
            headers[`Content-Type`] = `application/json`;
        }
    }
    else {
        // @ts-expect-error todo needs ADT for TS to understand the different states
        queryParams = buildRequestConfig({
            query,
            variables,
            operationName,
            jsonSerializer: fetchOptions.jsonSerializer ?? defaultJsonSerializer,
        });
    }
    const init = {
        method,
        headers,
        body,
        ...fetchOptions,
    };
    let urlResolved = url;
    let initResolved = init;
    if (middleware) {
        const result = await Promise.resolve(middleware({ ...init, url, operationName, variables }));
        const { url: urlNew, ...initNew } = result;
        urlResolved = urlNew;
        initResolved = initNew;
    }
    if (queryParams) {
        urlResolved = `${urlResolved}?${queryParams}`;
    }
    return await fetch(urlResolved, initResolved);
};
/**
 * GraphQL Client.
 */
class GraphQLClient {
    constructor(url, requestConfig = {}) {
        this.url = url;
        this.requestConfig = requestConfig;
        /**
         * Send a GraphQL query to the server.
         */
        this.rawRequest = async (...args) => {
            const [queryOrOptions, variables, requestHeaders] = args;
            const rawRequestOptions = parseRawRequestArgs(queryOrOptions, variables, requestHeaders);
            const { headers, fetch = CrossFetch__default, method = `POST`, requestMiddleware, responseMiddleware, ...fetchOptions } = this.requestConfig;
            const { url } = this;
            if (rawRequestOptions.signal !== undefined) {
                fetchOptions.signal = rawRequestOptions.signal;
            }
            const { operationName } = resolveRequestDocument(rawRequestOptions.query);
            return makeRequest({
                url,
                query: rawRequestOptions.query,
                variables: rawRequestOptions.variables,
                headers: {
                    ...resolveHeaders(callOrIdentity(headers)),
                    ...resolveHeaders(rawRequestOptions.requestHeaders),
                },
                operationName,
                fetch,
                method,
                fetchOptions,
                middleware: requestMiddleware,
            })
                .then((response) => {
                if (responseMiddleware) {
                    responseMiddleware(response);
                }
                return response;
            })
                .catch((error) => {
                if (responseMiddleware) {
                    responseMiddleware(error);
                }
                throw error;
            });
        };
    }
    async request(documentOrOptions, ...variablesAndRequestHeaders) {
        const [variables, requestHeaders] = variablesAndRequestHeaders;
        const requestOptions = parseRequestArgs(documentOrOptions, variables, requestHeaders);
        const { headers, fetch = CrossFetch__default, method = `POST`, requestMiddleware, responseMiddleware, ...fetchOptions } = this.requestConfig;
        const { url } = this;
        if (requestOptions.signal !== undefined) {
            fetchOptions.signal = requestOptions.signal;
        }
        const { query, operationName } = resolveRequestDocument(requestOptions.document);
        return makeRequest({
            url,
            query,
            variables: requestOptions.variables,
            headers: {
                ...resolveHeaders(callOrIdentity(headers)),
                ...resolveHeaders(requestOptions.requestHeaders),
            },
            operationName,
            fetch,
            method,
            fetchOptions,
            middleware: requestMiddleware,
        })
            .then((response) => {
            if (responseMiddleware) {
                responseMiddleware(response);
            }
            return response.data;
        })
            .catch((error) => {
            if (responseMiddleware) {
                responseMiddleware(error);
            }
            throw error;
        });
    }
    // prettier-ignore
    batchRequests(documentsOrOptions, requestHeaders) {
        const batchRequestOptions = parseBatchRequestArgs(documentsOrOptions, requestHeaders);
        const { headers, ...fetchOptions } = this.requestConfig;
        if (batchRequestOptions.signal !== undefined) {
            fetchOptions.signal = batchRequestOptions.signal;
        }
        const queries = batchRequestOptions.documents.map(({ document }) => resolveRequestDocument(document).query);
        const variables = batchRequestOptions.documents.map(({ variables }) => variables);
        return makeRequest({
            url: this.url,
            query: queries,
            // @ts-expect-error TODO reconcile batch variables into system.
            variables,
            headers: {
                ...resolveHeaders(callOrIdentity(headers)),
                ...resolveHeaders(batchRequestOptions.requestHeaders),
            },
            operationName: undefined,
            fetch: this.requestConfig.fetch ?? CrossFetch__default,
            method: this.requestConfig.method || `POST`,
            fetchOptions,
            middleware: this.requestConfig.requestMiddleware,
        })
            .then((response) => {
            if (this.requestConfig.responseMiddleware) {
                this.requestConfig.responseMiddleware(response);
            }
            return response.data;
        })
            .catch((error) => {
            if (this.requestConfig.responseMiddleware) {
                this.requestConfig.responseMiddleware(error);
            }
            throw error;
        });
    }
    setHeaders(headers) {
        this.requestConfig.headers = headers;
        return this;
    }
    /**
     * Attach a header to the client. All subsequent requests will have this header.
     */
    setHeader(key, value) {
        const { headers } = this.requestConfig;
        if (headers) {
            // todo what if headers is in nested array form... ?
            //@ts-expect-error todo
            headers[key] = value;
        }
        else {
            this.requestConfig.headers = { [key]: value };
        }
        return this;
    }
    /**
     * Change the client endpoint. All subsequent requests will send to this endpoint.
     */
    setEndpoint(value) {
        this.url = value;
        return this;
    }
}
const makeRequest = async (params) => {
    const { query, variables, fetchOptions } = params;
    const fetcher = createHttpMethodFetcher(uppercase(params.method ?? `post`));
    const isBatchingQuery = Array.isArray(params.query);
    const response = await fetcher(params);
    const result = await getResult(response, fetchOptions.jsonSerializer ?? defaultJsonSerializer);
    const successfullyReceivedData = Array.isArray(result)
        ? !result.some(({ data }) => !data)
        : Boolean(result.data);
    const successfullyPassedErrorPolicy = Array.isArray(result) ||
        !result.errors ||
        (Array.isArray(result.errors) && !result.errors.length) ||
        fetchOptions.errorPolicy === `all` ||
        fetchOptions.errorPolicy === `ignore`;
    if (response.ok && successfullyPassedErrorPolicy && successfullyReceivedData) {
        // @ts-expect-error TODO fixme
        const { errors: _, ...rest } = Array.isArray(result) ? result : result;
        const data = fetchOptions.errorPolicy === `ignore` ? rest : result;
        const dataEnvelope = isBatchingQuery ? { data } : data;
        // @ts-expect-error TODO
        return {
            ...dataEnvelope,
            headers: response.headers,
            status: response.status,
        };
    }
    else {
        const errorResult = typeof result === `string`
            ? {
                error: result,
            }
            : result;
        throw new ClientError(
        // @ts-expect-error TODO
        { ...errorResult, status: response.status, headers: response.headers }, { query, variables });
    }
};
const createRequestBody = (query, variables, operationName, jsonSerializer) => {
    const jsonSerializer_ = jsonSerializer ?? defaultJsonSerializer;
    if (!Array.isArray(query)) {
        return jsonSerializer_.stringify({ query, variables, operationName });
    }
    if (typeof variables !== `undefined` && !Array.isArray(variables)) {
        throw new Error(`Cannot create request body with given variable type, array expected`);
    }
    // Batch support
    const payload = query.reduce((acc, currentQuery, index) => {
        acc.push({ query: currentQuery, variables: variables ? variables[index] : undefined });
        return acc;
    }, []);
    return jsonSerializer_.stringify(payload);
};
const getResult = async (response, jsonSerializer) => {
    let contentType;
    response.headers.forEach((value, key) => {
        if (key.toLowerCase() === `content-type`) {
            contentType = value;
        }
    });
    if (contentType &&
        (contentType.toLowerCase().startsWith(`application/json`) ||
            contentType.toLowerCase().startsWith(`application/graphql+json`) ||
            contentType.toLowerCase().startsWith(`application/graphql-response+json`))) {
        return jsonSerializer.parse(await response.text());
    }
    else {
        return response.text();
    }
};
const callOrIdentity = (value) => {
    return typeof value === `function` ? value() : value;
};

var Locales = /* @__PURE__ */ ((Locales2) => {
  Locales2["All"] = "ALL";
  Locales2["Neutral"] = "NEUTRAL";
  Locales2["En"] = "en";
  Locales2["Nl"] = "nl";
  return Locales2;
})(Locales || {});
const ArticleListElementFragmentDoc = gql`
    fragment ArticleListElement on ArticleListElement {
  articleListCount
}
    `;
const CardElementFragmentDoc = gql`
    fragment CardElement on CardElement {
  Heading
  Subheading
  OverlayText
  CoverImage {
    url {
      default
    }
  }
  DisplayAs
  CallToAction {
    text
    url {
      default
    }
  }
}
    `;
const ContactElementFragmentDoc = gql`
    fragment ContactElement on ContactElement {
  Contact {
    key
  }
}
    `;
const CtaElementFragmentDoc = gql`
    fragment CTAElement on CTAElement {
  Text
  Link {
    default
  }
}
    `;
const EventElementFragmentDoc = gql`
    fragment EventElement on EventElement {
  Title
  Date
  Address
}
    `;
const HeadingElementFragmentDoc = gql`
    fragment HeadingElement on HeadingElement {
  headingText
}
    `;
const HeroElementFragmentDoc = gql`
    fragment HeroElement on HeroElement {
  Video {
    url {
      default
    }
  }
  Image {
    url {
      default
    }
  }
  Heading
  SubHeading
  RichText {
    html
  }
  CallToAction {
    url {
      default
    }
    title
    text
  }
}
    `;
const ImageElementFragmentDoc = gql`
    fragment ImageElement on ImageElement {
  altText
  imageLink {
    url {
      default
    }
  }
}
    `;
const ParagraphElementFragmentDoc = gql`
    fragment ParagraphElement on ParagraphElement {
  text {
    html
  }
}
    `;
const VideoElementFragmentDoc = gql`
    fragment VideoElement on VideoElement {
  placeholder {
    url {
      default
    }
  }
  title
  video {
    url {
      default
    }
  }
}
    `;
const BlankExperienceSeoFragmentDoc = gql`
    fragment BlankExperienceSeo on BlankExperience {
  BlankExperienceSeoSettings {
    MetaTitle
    MetaDescription
  }
}
    `;
const PageSeoSettingsPropertyFragmentDoc = gql`
    fragment PageSeoSettingsProperty on PageSeoSettingsProperty {
  MetaTitle
  MetaDescription
  SharingImage {
    url {
      default
    }
  }
  GraphType
}
    `;
const BlogPostPageFragmentDoc = gql`
    fragment BlogPostPage on BlogPostPage {
  _metadata {
    url {
      default
    }
  }
  Heading
  ArticleSubHeading
  ArticleAuthor
  BlogPostPromoImage {
    url {
      default
    }
  }
  BlogPostBody {
    html
  }
  SeoSettings {
    ...PageSeoSettingsProperty
  }
}
    `;
const BlogListingBlockFragmentDoc = gql`
    fragment BlogListingBlock on BlogListingBlock {
  BlogListingItemCount
  BlogListingShowFilters
}
    `;
const LandingPageFragmentDoc = gql`
    fragment LandingPage on LandingPage {
  MainContentArea {
    _metadata {
      types
    }
    ...BlogListingBlock
  }
  SeoSettings {
    ...PageSeoSettingsProperty
  }
}
    `;
const DisplaySettingsFragmentDoc = gql`
    fragment DisplaySettings on CompositionDisplaySetting {
  key
  value
}
    `;
const ContentByIdDocument = gql`
    query contentById($key: [String]!, $loc: [Locales]!, $ver: String!) {
  _Content(ids: $key, locale: $loc, where: {_metadata: {version: {eq: $ver}}}) {
    items {
      _metadata {
        types
      }
    }
  }
}
    `;
const ContentByPathDocument = gql`
    query contentByPath($url: String!) {
  _Content(where: {_metadata: {url: {default: {eq: $url}}}}) {
    items {
      _metadata {
        key
        version
        locale
      }
    }
  }
}
    `;
const GetExperienceDocument = gql`
    query getExperience($key: String, $ver: String, $loc: [Locales]) {
  _Experience(
    locale: $loc
    where: {_metadata: {key: {eq: $key}}, _or: {_metadata: {version: {eq: $ver}}}}
  ) {
    items {
      _metadata {
        key
        version
        url {
          default
        }
        types
      }
      ...BlankExperienceSeo
      composition {
        grids: nodes {
          key
          displayName
          displayTemplateKey
          displaySettings {
            ...DisplaySettings
          }
          ... on CompositionStructureNode {
            key
            rows: nodes {
              ... on CompositionStructureNode {
                key
                displayTemplateKey
                displaySettings {
                  ...DisplaySettings
                }
                columns: nodes {
                  ... on CompositionStructureNode {
                    key
                    displayTemplateKey
                    displaySettings {
                      ...DisplaySettings
                    }
                    nodes {
                      ... on CompositionElementNode {
                        key
                        displayTemplateKey
                        displaySettings {
                          ...DisplaySettings
                        }
                        element {
                          _metadata {
                            types
                          }
                          ...HeadingElement
                          ...ImageElement
                          ...CTAElement
                          ...VideoElement
                          ...ParagraphElement
                          ...ContactElement
                          ...EventElement
                          ...CardElement
                          ...HeroElement
                          ...ArticleListElement
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    ${BlankExperienceSeoFragmentDoc}
${DisplaySettingsFragmentDoc}
${HeadingElementFragmentDoc}
${ImageElementFragmentDoc}
${CtaElementFragmentDoc}
${VideoElementFragmentDoc}
${ParagraphElementFragmentDoc}
${ContactElementFragmentDoc}
${EventElementFragmentDoc}
${CardElementFragmentDoc}
${HeroElementFragmentDoc}
${ArticleListElementFragmentDoc}`;
const GetExperienceSeoDocument = gql`
    query getExperienceSeo($key: String, $ver: String, $loc: [Locales]) {
  _Experience(
    locale: $loc
    where: {_metadata: {key: {eq: $key}}, _or: {_metadata: {version: {eq: $ver}}}}
  ) {
    items {
      _metadata {
        types
      }
      ...BlankExperienceSeo
    }
  }
}
    ${BlankExperienceSeoFragmentDoc}`;
const PageByIdDocument = gql`
    query pageById($key: [String], $loc: [Locales], $ver: String) {
  _Page(ids: $key, locale: $loc, where: {_metadata: {version: {eq: $ver}}}) {
    items {
      ...BlogPostPage
      ...LandingPage
    }
  }
}
    ${BlogPostPageFragmentDoc}
${PageSeoSettingsPropertyFragmentDoc}
${LandingPageFragmentDoc}
${BlogListingBlockFragmentDoc}`;
const GetBlogPostsDocument = gql`
    query getBlogPosts($loc: [Locales], $limit: Int! = 15, $status: String! = "Published") {
  BlogPostPage(
    locale: $loc
    orderBy: {_metadata: {published: DESC}}
    limit: $limit
    where: {_metadata: {status: {eq: $status}}}
  ) {
    items {
      _metadata {
        url {
          default
        }
      }
      ... on BlogPostPage {
        Heading
        ArticleSubHeading
        BlogPostPromoImage {
          url {
            default
          }
        }
      }
    }
  }
}
    `;
function getSdk(requester) {
  return {
    contentById(variables, options) {
      return requester(ContentByIdDocument, variables, options);
    },
    contentByPath(variables, options) {
      return requester(ContentByPathDocument, variables, options);
    },
    getExperience(variables, options) {
      return requester(GetExperienceDocument, variables, options);
    },
    getExperienceSeo(variables, options) {
      return requester(GetExperienceSeoDocument, variables, options);
    },
    pageById(variables, options) {
      return requester(PageByIdDocument, variables, options);
    },
    getBlogPosts(variables, options) {
      return requester(GetBlogPostsDocument, variables, options);
    }
  };
}

const requesterDraft = async (doc, vars) => {
  const token = btoa(
    `${process.env.OPTIMIZELY_GRAPH_APP_KEY}:${undefined                                           }`
  );
  const previewClient = new GraphQLClient(
    `${process.env.OPTIMIZELY_GRAPH_GATEWAY}/content/v2`,
    {
      headers: {
        authorization: `Basic ${token}`
      }
    }
  );
  try {
    const res = await previewClient.rawRequest(print(doc), vars);
    return res?.data;
  } catch (err) {
    {
      console.error(err);
    }
    console.error(
      "Error in GraphQL request:",
      "\n" + print(doc) + "\n",
      vars,
      "\n" + err.message
    );
  }
};
const requesterPublished = async (doc, vars) => {
  const client = new GraphQLClient(
    `${process.env.OPTIMIZELY_GRAPH_GATEWAY}/content/v2?auth=${process.env.OPTIMIZELY_GRAPH_SINGLE_KEY}`
  );
  try {
    const res = await client.rawRequest(print(doc), vars);
    return res?.data;
  } catch (err) {
    {
      console.error(err);
    }
    console.error(
      "Error in GraphQL request:",
      "\n" + print(doc) + "\n",
      vars,
      "\n" + err.message
    );
  }
};
const optiDraftSdk = getSdk(requesterDraft);
const optiPublishedSdk = getSdk(requesterPublished);
function getOptimizelySdk(mode) {
  return mode === "edit" ? optiDraftSdk : optiPublishedSdk;
}

const $$Components = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<h1>Components</h1>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/OnPageEditing/components/_Components.astro", void 0);

function getDictionaryFromDisplaySettings(displaySettings) {
  const dictionary = {};
  displaySettings.forEach((setting) => {
    dictionary[setting.key] = setting.value;
  });
  return dictionary;
}

function getHeadingElementStyles(displaySettings) {
  const settings = getDictionaryFromDisplaySettings(displaySettings);
  let cssClasses = [];
  switch (settings["textAlign"]) {
    case "left":
      cssClasses.push("text-left mr-auto");
      break;
    case "center":
      cssClasses.push("text-center mx-auto");
      break;
    case "right":
      cssClasses.push("text-right ml-auto");
      break;
    case "justify":
      cssClasses.push("text-justify");
      break;
  }
  switch (settings["transform"]) {
    case "uppercase":
      cssClasses.push("uppercase");
      break;
    case "lowercase":
      cssClasses.push("lowercase");
      break;
    case "capitalize":
      cssClasses.push("capitalize");
      break;
  }
  switch (settings["headingType"]) {
    case "h1":
      cssClasses.push("font-bold my-0");
      cssClasses.push("text-[4.8rem]");
      cssClasses.push("lg:text-[6.4rem]");
      cssClasses.push("xl:text-[7.2rem]");
      break;
    case "h2":
      cssClasses.push("font-bold my-0");
      cssClasses.push("text-[4.2rem]");
      cssClasses.push("lg:text-[4.8rem]");
      cssClasses.push("xl:text-[6.4rem]");
      break;
    case "h3":
      cssClasses.push("font-bold my-0");
      cssClasses.push("text-[3.6rem]");
      cssClasses.push("lg:text-[4.2rem]");
      cssClasses.push("xl:text-[4.8rem]");
      break;
    case "h4":
      cssClasses.push("font-bold my-0");
      cssClasses.push("text-[3.6rem]");
      cssClasses.push("lg:text-[3.8rem]");
      cssClasses.push("xl:text-[4.2rem]");
      break;
    case "h5":
      cssClasses.push("font-bold my-0");
      cssClasses.push("text-[3.6rem]");
      cssClasses.push("lg:text-[3.0rem]");
      cssClasses.push("xl:text-[3.2rem]");
      break;
    case "h6":
      cssClasses.push("font-bold my-0");
      break;
    case "plain":
      cssClasses.push("my-0");
      break;
  }
  return cssClasses;
}

const $$Astro$l = createAstro();
const $$HeadingElement = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$HeadingElement;
  const { element, displaySettings } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(getHeadingElementStyles(displaySettings), "class:list")}>${element.headingText}</div>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/elements/HeadingElement/HeadingElement.astro", void 0);

const $$Astro$k = createAstro();
const $$CTAElement = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$CTAElement;
  const { element } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(element.Link.default, "href")} class="text-2xl">${element.Text}</a>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/elements/CTAElement/CTAElement.astro", void 0);

function getImageElementStyles(displaySettings) {
  const settings = getDictionaryFromDisplaySettings(displaySettings);
  let portraitAspectRatioClasses;
  ((portraitAspectRatioClasses2) => {
    portraitAspectRatioClasses2["square"] = "aspect-square";
    portraitAspectRatioClasses2["banner"] = "aspect-[1/4]";
    portraitAspectRatioClasses2["photo"] = "aspect-[2/3]";
    portraitAspectRatioClasses2["monitor"] = "aspect-[3/4]";
    portraitAspectRatioClasses2["widescreen"] = "aspect-[9/16]";
  })(portraitAspectRatioClasses || (portraitAspectRatioClasses = {}));
  let landscapeAspectRatioClasses;
  ((landscapeAspectRatioClasses2) => {
    landscapeAspectRatioClasses2["square"] = "aspect-square";
    landscapeAspectRatioClasses2["banner"] = "aspect-[4/1]";
    landscapeAspectRatioClasses2["photo"] = "aspect-[3/2]";
    landscapeAspectRatioClasses2["monitor"] = "aspect-[4/3]";
    landscapeAspectRatioClasses2["widescreen"] = "aspect-[16/9]";
  })(landscapeAspectRatioClasses || (landscapeAspectRatioClasses = {}));
  let roundedCornersClasses;
  ((roundedCornersClasses2) => {
    roundedCornersClasses2["small"] = "rounded";
    roundedCornersClasses2["medium"] = "rounded-md";
    roundedCornersClasses2["large"] = "rounded-lg";
    roundedCornersClasses2["huge"] = "rounded-[40px]";
    roundedCornersClasses2["full"] = "rounded-full";
    roundedCornersClasses2["none"] = "";
  })(roundedCornersClasses || (roundedCornersClasses = {}));
  const cssClasses = ["relative w-full overflow-hidden not-prose"];
  const isPortrait = displaySettings["orientation"] == "portrait";
  cssClasses.push(
    (isPortrait ? portraitAspectRatioClasses[settings["aspectRatio"]] : landscapeAspectRatioClasses[settings["aspectRatio"]]) ?? ""
  );
  cssClasses.push(roundedCornersClasses[settings["roundedCorners"]] ?? "");
  return cssClasses;
}

const $$Astro$j = createAstro();
const $$ImageElement = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$ImageElement;
  const { element, displaySettings } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(getImageElementStyles(displaySettings), "class:list")}${addAttribute(element.imageLink.url.default, "src")}${addAttribute(element.altText, "alt")}>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/elements/ImageElement/ImageElement.astro", void 0);

const $$Astro$i = createAstro();
const $$VideoElement = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$VideoElement;
  const { element } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<video${addAttribute(element.video.url.default, "src")} autoplay muted></video>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/elements/VideoElement/VideoElement.astro", void 0);

const $$Astro$h = createAstro();
const $$ParagraphElement = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$ParagraphElement;
  const { element } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div>${unescapeHTML(element.text.html)}</div>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/elements/ParagraphElement/ParagraphElement.astro", void 0);

const $$Astro$g = createAstro();
const $$ContactElement = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$ContactElement;
  const { element, contentPayload } = Astro2.props;
  const optiResponse = await getOptimizelySdk(contentPayload.ctx).pageById({
    key: element.Contact.key,
    loc: Locales.En
  });
  const contactPage = optiResponse._Page.items[0];
  return renderTemplate`${contactPage.Name && renderTemplate`${maybeRenderHead()}<div class="m-4"><a href="#" class="relative block overflow-hidden rounded-lg p-4 sm:p-6 lg:p-8"><span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span><div class="sm:flex sm:justify-between sm:gap-4"><div><h3 class="text-lg font-bold text-gray-900 sm:text-xl">${contactPage.Name}</h3><p class="mt-1 text-xs font-medium text-gray-600">${contactPage.Designation}</p></div><div class="hidden sm:block sm:shrink-0"><img alt=""${addAttribute(contactPage.Image?.url.default, "src")} class="size-32 rounded-lg object-cover shadow-sm"><a class="inline-block mt-4 rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" href="#">${contactPage.Email}</a></div></div><div class="mt-4"><p class="text-pretty text-sm text-gray-500">
📍 ${contactPage.Location}</p></div><div class="mt-4"><p class="text-pretty text-sm text-gray-500">${contactPage.Phone}</p></div></a></div>`}`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/elements/Contact/ContactElement.astro", void 0);

const $$Astro$f = createAstro();
const $$EventElement = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$EventElement;
  const { element } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div> <a href="#" class="block rounded-lg p-4 shadow-sm shadow-indigo-100"> <img alt="" src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" class="h-56 w-full rounded-md object-cover"> <div class="mt-2"> <dl> <div> <dt class="sr-only">Price</dt> <dd class="text-2xl text-blue-700">${element.Title}</dd> </div> <div> <dt class="sr-only">Address</dt> <dd class="font-medium">${element.Address}</dd> </div> </dl> <div class="mt-6 flex items-center gap-8 text-xs"> <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2"> <svg class="size-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path> </svg> <div class="mt-1.5 sm:mt-0"> <p class="text-gray-500">Parking</p> <p class="font-medium">2 spaces</p> </div> </div> <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2"> <svg class="size-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path> </svg> <div class="mt-1.5 sm:mt-0"> <p class="text-gray-500">Bathroom</p> <p class="font-medium">2 rooms</p> </div> </div> <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2"> <svg class="size-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> <div class="mt-1.5 sm:mt-0"> <p class="text-gray-500">Bedroom</p> <p class="font-medium">4 rooms</p> </div> </div> </div> </div> </a> </div>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/elements/EventElement/EventElement.astro", void 0);

const $$Astro$e = createAstro();
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Card;
  const { element } = Astro2.props;
  const imageUrl = element.CoverImage?.url.default || null;
  return renderTemplate`${element.DisplayAs === "textOnHover" && renderTemplate`${maybeRenderHead()}<a href="#" class="group relative block bg-black h-96"><img alt=""${addAttribute(imageUrl, "src")} class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"><div class="relative p-4 sm:p-6 lg:p-8"><p class="text-sm font-medium uppercase tracking-widest text-pink-500">${element.Heading}</p><p class="text-xl font-bold text-white sm:text-2xl">${element.Subheading}</p><div class="mt-20 sm:mt-36 lg:mt-48"><div class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"><p class="text-lg text-white">${element.OverlayText}</p></div></div></div></a>`}${element.DisplayAs === "textBelowCard" && renderTemplate`<a href="#" class="block"><img alt=""${addAttribute(imageUrl, "src")} class="h-64 w-full object-cover sm:h-80 lg:h-96"><h3 class="mt-4 text-6xl font-bold text-gray-900">${element.Heading}</h3><p class="mt-2 text-2xl max-w-sm text-gray-700">${element.OverlayText}</p></a>`}${element.DisplayAs === "textOnLeft" && renderTemplate`<section class="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2"><div class="p-8 md:p-12 lg:px-16 lg:py-24"><div class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"><h2 class="text-5xl font-bold text-gray-900 md:text-5xl">${element.Heading}</h2><p class="hidden text-gray-500 md:mt-4 md:block">${element.OverlayText}</p><div class="mt-4 md:mt-8"><a${addAttribute(element.CallToAction?.url?.default, "href")} class="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400">${element.CallToAction?.text}</a></div></div></div><img alt=""${addAttribute(element.CoverImage?.url?.default, "src")} class="h-56 w-full object-cover sm:h-full"></section>`}${element.DisplayAs === "textOnRight" && renderTemplate`<section class="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2"><img alt=""${addAttribute(element.CoverImage?.url?.default, "src")} class="h-56 w-full object-cover sm:h-full"><div class="p-8 md:p-12 lg:px-16 lg:py-24"><div class="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right"><h2 class="text-5xl font-bold text-gray-900 md:text-5xl">${element.Heading}</h2><p class="hidden text-gray-500 md:mt-4 md:block">${element.OverlayText}</p><div class="mt-4 md:mt-8"><a${addAttribute(element.CallToAction?.url?.default, "href")} class="inline-block rounded bg-emerald-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400">${element.CallToAction?.text}</a></div></div></div></section>`}`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/elements/CardElement/Card.astro", void 0);

const $$Astro$d = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Hero;
  const { element } = Astro2.props;
  const videoUrl = element.Video?.url.default || null;
  const imageUrl = element.Image?.url.default || null;
  const hasVideo = videoUrl !== null;
  return renderTemplate`<!--
  Heads up! 👋

  This component comes with some \`rtl\` classes. Please remove them if they are not needed in your project.
-->${maybeRenderHead()}<section class="relative h-[50vh] w-full overflow-hidden text-white"> <!-- Video Background --> ${hasVideo && renderTemplate`<video autoplay muted loop class="absolute inset-0 w-full object-cover"> <source${addAttribute(videoUrl, "src")} type="video/mp4">
Your browser does not support the video tag.
</video>`} <!-- Image Background --> ${imageUrl && !hasVideo && renderTemplate`${renderComponent($$result, "Image", $$Image, { "alt": "Hero", "src": imageUrl, "class": "absolute inset-0 w-full object-cover", "inferSize": true })}`} <!-- Overlay --> <div class="absolute inset-0 bg-black bg-opacity-50"></div> <!-- Content Overlay --> <div class="relative flex flex-col items-center justify-center text-center p-16 z-10"> ${element.Heading && renderTemplate`<h1 class="text-4xl md:text-6xl font-bold mb-4">${element.Heading}</h1>`} ${element.SubHeading && renderTemplate`<p class="text-lg md:text-xl max-w-2xl mb-8"> ${element.SubHeading} </p>`} ${element.RichText && renderTemplate`<div class="text-sm max-w-2xl mb-8">${unescapeHTML(element.RichText.html)}</div>`} ${element.CallToAction.url && renderTemplate`<a${addAttribute(element.CallToAction.url.default, "href")} class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300"> ${element.CallToAction.text} </a>`} </div> </section>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/elements/HeroElement/Hero.astro", void 0);

const $$Astro$c = createAstro();
const $$BlogListingItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$BlogListingItem;
  const { data } = Astro2.props;
  const url = data?._metadata?.url?.default || "";
  return renderTemplate`${url && renderTemplate`${maybeRenderHead()}<article class="flex bg-white border-2 border-gray-100 transition hover:shadow-xl"><div class="rotate-180 p-2 [writing-mode:_vertical-lr]"><time datetime="2022-10-10" class="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"><span>2022</span><span class="w-px flex-1 bg-gray-900/10"></span><span>Oct 10</span></time></div><div class="hidden sm:block sm:basis-56"><img alt=""${addAttribute(data.BlogPostPromoImage?.url?.default, "src")} class="aspect-square h-full w-full object-cover" loading="lazy"></div><div class="flex flex-1 flex-col justify-between"><div class="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6"><a${addAttribute(url, "href")}><h3 class="font-bold uppercase text-gray-900">${data.Heading}</h3></a><p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">${data.ArticleSubHeading}</p></div><div class="sm:flex sm:items-end sm:justify-end"><a${addAttribute(url, "href")} class="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400">
Read Blog
</a></div></div></article>`}`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/OnPageEditing/components/BlogListingBlock/BlogListingItem.astro", void 0);

const $$Astro$b = createAstro();
const $$ArticleListElement = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ArticleListElement;
  const { contentPayload, element } = Astro2.props;
  const optiResponse = await getOptimizelySdk(contentPayload.ctx).getBlogPosts({
    loc: contentPayload.loc,
    limit: element.articleListCount
  });
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-3 gap-20"> ${optiResponse.BlogPostPage.items.map((item) => renderTemplate`${renderComponent($$result, "BlogListingItem", $$BlogListingItem, { "data": item })}`)} </div>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/elements/ArticlesList/ArticleListElement.astro", void 0);

const $$Astro$a = createAstro();
const $$Elements = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Elements;
  const { contentPayload } = Astro2.props;
  const { element, displaySettings, displayTemplateKey } = Astro2.props.element;
  const elementType = element._metadata.types[0];
  return renderTemplate`${elementType === "HeadingElement" && renderTemplate`${renderComponent($$result, "HeadingElement", $$HeadingElement, { "contentPayload": contentPayload, "element": element, "displaySettings": displaySettings })}`}${elementType === "CTAElement" && renderTemplate`${renderComponent($$result, "CTAElement", $$CTAElement, { "contentPayload": contentPayload, "element": element, "displaySettings": displaySettings })}`}${elementType === "ImageElement" && renderTemplate`${renderComponent($$result, "ImageElement", $$ImageElement, { "contentPayload": contentPayload, "element": element, "displaySettings": displaySettings })}`}${elementType === "VideoElement" && renderTemplate`${renderComponent($$result, "VideoElement", $$VideoElement, { "contentPayload": contentPayload, "element": element, "displaySettings": displaySettings })}`}${elementType === "ParagraphElement" && renderTemplate`${renderComponent($$result, "ParagraphElement", $$ParagraphElement, { "contentPayload": contentPayload, "element": element, "displaySettings": displaySettings })}`}${elementType === "ContactElement" && renderTemplate`${renderComponent($$result, "ContactElement", $$ContactElement, { "contentPayload": contentPayload, "element": element, "displaySettings": displaySettings })}`}${elementType === "EventElement" && renderTemplate`${renderComponent($$result, "EventElement", $$EventElement, { "contentPayload": contentPayload, "element": element, "displaySettings": displaySettings })}`}${elementType === "CardElement" && renderTemplate`${renderComponent($$result, "Card", $$Card, { "contentPayload": contentPayload, "element": element, "displaySettings": displaySettings, "displayTemplateKey": displayTemplateKey })}`}${elementType === "HeroElement" && renderTemplate`${renderComponent($$result, "Hero", $$Hero, { "contentPayload": contentPayload, "element": element, "displaySettings": displaySettings })}`}${elementType === "ArticleListElement" && renderTemplate`${renderComponent($$result, "ArticleListElement", $$ArticleListElement, { "contentPayload": contentPayload, "element": element, "displaySettings": displaySettings })}`}`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/elements/_Elements.astro", void 0);

function getColumnStyles(column) {
  const displaySettings = column.displaySettings;
  const dictionary = getDictionaryFromDisplaySettings(displaySettings);
  let cssClasses = [];
  switch (column.displayTemplateKey) {
    case "DefaultColumn":
      switch (dictionary["contentSpacing"]) {
        case "small":
          cssClasses.push("gap-2 py-2");
          break;
        case "medium":
          cssClasses.push("gap-4 py-4");
          break;
        case "large":
          cssClasses.push("gap-8 py-8 lg:gap-8 lg:py-8");
          break;
        case "xl":
          cssClasses.push("gap-12 py-12 lg:gap-24 lg:py-24");
          break;
        case "xxl":
          cssClasses.push("gap-16 py-16 lg:gap-72 lg:py-72");
          break;
        default:
          cssClasses.push("gap-0 py-0");
          break;
      }
      switch (dictionary["justifyContent"]) {
        case "center":
          cssClasses.push("justify-center");
          break;
        case "end":
          cssClasses.push("justify-end");
          break;
        default:
          cssClasses.push("justify-start");
          break;
      }
      switch (dictionary["alignContent"]) {
        case "center":
          cssClasses.push("content-center");
          break;
        case "end":
          cssClasses.push("content-end");
          break;
        default:
          cssClasses.push("content-start");
          break;
      }
      switch (dictionary["showFrom"]) {
        case "fromSmall":
          cssClasses.push("hidden sm:block");
          break;
        case "fromMedium":
          cssClasses.push("hidden md:block");
          break;
        case "fromLarge":
          cssClasses.push("hidden lg:block");
          break;
      }
      switch (dictionary["minWidth"]) {
        case "small":
          cssClasses.push("lg:min-w-[24rem]");
          break;
        case "medium":
          cssClasses.push("lg:min-w-[48rem]");
          break;
        case "large":
          cssClasses.push("lg:min-w-[64rem]");
          break;
      }
      cssClasses.push("relative top-0");
      switch (dictionary["overflow"]) {
        case "right":
          cssClasses.push("left-0");
          break;
        case "left":
          cssClasses.push("right-0");
          break;
        case "clip":
          cssClasses.push("overflow-hidden");
          break;
      }
      break;
    default:
      cssClasses.push("vb:NoStyles");
      break;
  }
  return cssClasses;
}

const $$Astro$9 = createAstro();
const $$Column = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Column;
  const { column, contentPayload } = Astro2.props;
  const styles = getColumnStyles(column);
  return renderTemplate`<!--<h3>this is a column</h3>-->${maybeRenderHead()}<div${addAttribute(["flex-1 flex flex-col flex-nowrap vb:col", styles], "class:list")}${addAttribute(column.key, "data-epi-block-id")}> ${column.nodes?.map((element) => (
    // <p>{element.displaySettings.map((ds: any) => (`${ds.key} : ${ds.value}`))}</p>
    renderTemplate`<div${addAttribute(element?.key, "data-epi-block-id")}> ${renderComponent($$result, "Elements", $$Elements, { "contentPayload": contentPayload, "element": element })} </div>`
  ))} </div>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/compositions/Column/Column.astro", void 0);

const $$Astro$8 = createAstro();
const $$CarouselRow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$CarouselRow;
  const { row, contentPayload } = Astro2.props;
  let items = [];
  row.columns?.map((column) => {
    column.elements?.map((element) => {
      items.push(element);
    });
  });
  return renderTemplate`${maybeRenderHead()}<div class="carousel w-full"> ${items.map((item, index) => renderTemplate`<div${addAttribute(`slide${index}`, "id")} class="carousel-item relative w-full"> ${renderComponent($$result, "Elements", $$Elements, { "contentPayload": contentPayload, "element": item })} <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"> <a${addAttribute(`#slide${index === 0 ? items.length - 1 : index - 1}`, "href")} class="btn btn-circle">❮</a> <a${addAttribute(`#slide${index === items.length - 1 ? 0 : index + 1}`, "href")} class="btn btn-circle">❯</a> </div> </div>`)} </div>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/compositions/Row/CarouselRow.astro", void 0);

function getRowStyles(row) {
  const displaySettings = row.displaySettings;
  const dictionary = getDictionaryFromDisplaySettings(displaySettings);
  let RowFromClasses;
  ((RowFromClasses2) => {
    RowFromClasses2["md"] = "md:flex-row";
    RowFromClasses2["lg"] = "lg:flex-row";
    RowFromClasses2["xl"] = "xl:flex-row";
  })(RowFromClasses || (RowFromClasses = {}));
  let ContentSpacingClasses;
  ((ContentSpacingClasses2) => {
    ContentSpacingClasses2["small"] = "gap-2";
    ContentSpacingClasses2["medium"] = "gap-4";
    ContentSpacingClasses2["large"] = "gap-4 lg:gap-8";
    ContentSpacingClasses2["xl"] = "gap-4 lg:gap-24";
    ContentSpacingClasses2["xxl"] = "gap-4 lg:gap-72";
    ContentSpacingClasses2["none"] = "gap-0";
  })(ContentSpacingClasses || (ContentSpacingClasses = {}));
  let JustifyContentClasses;
  ((JustifyContentClasses2) => {
    JustifyContentClasses2["center"] = "justify-center";
    JustifyContentClasses2["end"] = "justify-end";
    JustifyContentClasses2["start"] = "justify-start";
  })(JustifyContentClasses || (JustifyContentClasses = {}));
  let AlignContentClasses;
  ((AlignContentClasses2) => {
    AlignContentClasses2["center"] = "content-center";
    AlignContentClasses2["end"] = "content-end";
    AlignContentClasses2["start"] = "content-start";
  })(AlignContentClasses || (AlignContentClasses = {}));
  let VerticalSpacingClasses;
  ((VerticalSpacingClasses2) => {
    VerticalSpacingClasses2["small"] = "my-2";
    VerticalSpacingClasses2["medium"] = "my-4";
    VerticalSpacingClasses2["large"] = "my-8";
    VerticalSpacingClasses2["verylarge"] = "lg:my-40 my-20";
    VerticalSpacingClasses2["none"] = "my-0";
  })(VerticalSpacingClasses || (VerticalSpacingClasses = {}));
  let cssClasses = [];
  cssClasses.push(ContentSpacingClasses[dictionary["contentSpacing"]] ?? "");
  cssClasses.push(JustifyContentClasses[dictionary["justifyContent"]] ?? "");
  cssClasses.push(AlignContentClasses[dictionary["alignContent"]] ?? "");
  cssClasses.push(VerticalSpacingClasses[dictionary["verticalSpacing"]] ?? "");
  cssClasses.push(RowFromClasses[dictionary["showAsRowFrom"]] ?? "");
  return cssClasses;
}

const $$Astro$7 = createAstro();
const $$Row = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Row;
  const { row, contentPayload } = Astro2.props;
  const rowNode = row;
  const displayTemplateKey = rowNode.displayTemplateKey;
  const styles = getRowStyles(rowNode);
  return renderTemplate`<!--<h2>this is a row</h2>-->${displayTemplateKey !== "CarouselRow" && renderTemplate`${maybeRenderHead()}<div${addAttribute(["p-1 flex-1 flex flex-row flex-nowrap justify-start vb:row", styles], "class:list")}${addAttribute(row.key, "data-epi-block-id")}>${row.columns?.map((column) => renderTemplate`${renderComponent($$result, "Column", $$Column, { "contentPayload": contentPayload, "column": column })}`)}</div>`}${displayTemplateKey === "CarouselRow" && renderTemplate`<div${addAttribute(["p-1 h-[50vh] flex-none flex flex-row flex-nowrap justify-start vb:row", styles], "class:list")}${addAttribute(row.key, "data-epi-block-id")}>${renderComponent($$result, "CarouselRow", $$CarouselRow, { "contentPayload": contentPayload, "row": row })}</div>`}`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/compositions/Row/Row.astro", void 0);

function getSectionStyles(grid) {
  const displaySettings = grid.displaySettings;
  const dictionary = getDictionaryFromDisplaySettings(displaySettings);
  let cssClasses = [];
  switch (grid.displayTemplateKey) {
    case "DefaultGrid":
      switch (dictionary["gridWidth"]) {
        case "default":
          cssClasses.push("container mx-auto px-8");
          break;
        case "full":
          cssClasses.push("w-full");
          break;
        case "narrow":
          cssClasses.push("max-w-3xl w-full mx-auto px-8");
          break;
        case "wide":
          cssClasses.push("max-w-7xl w-full mx-auto px-8");
          break;
      }
      switch (dictionary["vSpacing"]) {
        case "default":
          cssClasses.push("my-8");
          break;
        case "small":
          cssClasses.push("py-4 md:py-8 lg:py-12");
          break;
        case "large":
          cssClasses.push("py-8 md:py-16 lg:py-24");
          break;
      }
      switch (dictionary["sectionColor"]) {
        case "black":
          cssClasses.push("bg-gray-950");
          break;
        case "blue":
          cssClasses.push("bg-blue-700");
          break;
      }
      break;
    default:
      cssClasses.push("vb:NoStyles");
      break;
  }
  return cssClasses;
}

const $$Astro$6 = createAstro();
const $$Section = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Section;
  const { grid, contentPayload } = Astro2.props;
  const styles = getSectionStyles(grid);
  return renderTemplate`<!--<h1>this is a grid!</h1>-->${maybeRenderHead()}<div${addAttribute(["relative w-full flex flex-col justify-start flex-nowrap vb:grid", styles], "class:list")}${addAttribute(grid.key, "data-epi-block-id")}> ${grid.rows?.map((row) => renderTemplate`${renderComponent($$result, "Row", $$Row, { "contentPayload": contentPayload, "row": row })}`)} </div>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/compositions/Section/Section.astro", void 0);

const $$Astro$5 = createAstro();
const $$Experiences = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Experiences;
  const previewPayload = Astro2.props.data;
  const optiResponse = await getOptimizelySdk(previewPayload.ctx).getExperience(
    { key: previewPayload.key, ver: previewPayload.ver, loc: previewPayload.loc }
  );
  const experiences = optiResponse?._Experience?.items;
  const experience = experiences[experiences.length - 1];
  let metaTitle = "", metaDescription = "";
  if (experience._metadata.types.includes("BlankExperience")) {
    const blankExperience = experience;
    metaTitle = blankExperience.BlankExperienceSeoSettings?.MetaTitle || "";
    metaDescription = blankExperience.BlankExperienceSeoSettings?.MetaDescription || "";
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": metaTitle, "description": metaDescription }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative w-full flex-1 vb:outline"> ${experience?.composition?.grids?.map((grid) => renderTemplate`${renderComponent($$result2, "Section", $$Section, { "contentPayload": previewPayload, "grid": grid })}`)} </div> ` })}`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/VisualBuilder/experiences/_Experiences.astro", void 0);

const $$Astro$4 = createAstro();
const $$BlogPostPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$BlogPostPage;
  const { contentPayload } = Astro2.props;
  const optiResponse = await getOptimizelySdk(contentPayload.ctx).pageById({
    key: contentPayload.key,
    loc: contentPayload.loc,
    ver: contentPayload.ver
  });
  const post = optiResponse._Page.items[0];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": post.SeoSettings?.MetaTitle, "description": post.SeoSettings?.MetaDescription }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-screen-6xl mx-auto"> <main class="mt-10"> <div class="mb-4 md:mb-0 w-full max-w-screen-xl mx-auto relative" style="height: 24em;"> <div class="absolute left-0 bottom-0 w-full h-full z-10" style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.7));"></div> <img${addAttribute(post.BlogPostPromoImage?.url?.default, "src")} class="absolute left-0 top-0 w-full h-full z-0 object-cover" data-epi-property-name="BlogPostPromoImage" loading="lazy"> <div class="p-4 absolute bottom-0 left-0 z-20"> <!--<a href="#"--> <!--   class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">Nutrition</a>--> <h2 class="text-4xl font-semibold text-gray-100 leading-tight" data-epi-property-name="Heading"> ${post.Heading} </h2> <div class="flex mt-3"> <img src="https://randomuser.me/api/portraits/men/97.jpg" class="h-10 w-10 rounded-full mr-2 object-cover"> <div> <p class="font-semibold text-gray-200 text-sm"> Mike Sullivan </p> <p class="font-semibold text-gray-400 text-xs"> 14 Aug </p> </div> </div> </div> </div> <div class="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-xl mx-auto text-lg leading-relaxed font-sans" data-epi-property-name="BlogPostBody">${unescapeHTML(post.BlogPostBody.html)}</div> </main> </div> ` })}`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/OnPageEditing/pages/BlogPostPage/BlogPostPage.astro", void 0);

const $$Astro$3 = createAstro();
const $$BlogListingBlock = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BlogListingBlock;
  const { data, contentPayload } = Astro2.props;
  const optiResponse = await getOptimizelySdk(contentPayload.ctx).getBlogPosts({
    loc: contentPayload.loc
  });
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-3 gap-20"> ${optiResponse.BlogPostPage.items.map((item) => renderTemplate`${renderComponent($$result, "BlogListingItem", $$BlogListingItem, { "data": item })}`)} </div>`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/OnPageEditing/components/BlogListingBlock/BlogListingBlock.astro", void 0);

const $$Astro$2 = createAstro();
const $$ContentArea = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ContentArea;
  const { contentAreaItem, contentPayload } = Astro2.props;
  const componentType = contentAreaItem?._metadata?.types?.[0];
  return renderTemplate`${componentType === "BlogListingBlock" && renderTemplate`${renderComponent($$result, "BlogListingBlock", $$BlogListingBlock, { "contentPayload": contentPayload, "data": contentAreaItem })}`}`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/OnPageEditing/shared/ContentArea/ContentArea.astro", void 0);

const $$Astro$1 = createAstro();
const $$LandingPage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LandingPage;
  const { contentPayload } = Astro2.props;
  const optiResponse = await getOptimizelySdk(contentPayload.ctx).pageById({
    key: contentPayload.key,
    loc: contentPayload.loc,
    ver: contentPayload.ver
  });
  const page = optiResponse._Page.items[0];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "todo", ",": true, "description": "todo" }, { "default": ($$result2) => renderTemplate`  ${page.MainContentArea?.map((contentAreaItem) => renderTemplate`${renderComponent($$result2, "ContentArea", $$ContentArea, { "contentPayload": contentPayload, "contentAreaItem": contentAreaItem })}`)}` })}`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/OnPageEditing/pages/LandingPage/LandingPage.astro", void 0);

const $$Astro = createAstro();
const $$Pages = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pages;
  const contentPayload = Astro2.props.data;
  const pageType = contentPayload.types[0];
  return renderTemplate`${pageType === "BlogPostPage" && renderTemplate`${renderComponent($$result, "BlogPostPage", $$BlogPostPage, { "contentPayload": contentPayload })}`}${pageType === "LandingPage" && renderTemplate`${renderComponent($$result, "LandingPage", $$LandingPage, { "contentPayload": contentPayload })}`}`;
}, "/Users/dknipe/Documents/projects/opti-astro/src/components/cms/OnPageEditing/pages/_Pages.astro", void 0);

export { $$Components as $, $$Experiences as a, $$Pages as b, getOptimizelySdk as g };
