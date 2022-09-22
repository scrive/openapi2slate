---
title: Scrive Document API
search: false
toc_footers:
  - Scrive Document API
  - <em>Version 2.0.0</em>
  - <hr>
  - <strong>Scrive AB</strong>
  - <em>All Rights Reserved</em>
  - <a href='https://scrive.com/'>https://scrive.com/</a>
  - <a href='mailto:info@scrive.com'>info@scrive.com</a>
---

# Scrive Document API

## General Information
### Version `2.0.0`

### Schemes
`https`


###Host & base path

`scrive.com/api/v2/`

### Terms of Service

In using this API you agree to be bound by the Scrive Terms of Service,
available at [http://scrive.com/en/terms](http://scrive.com/en/terms)


# Overview

The Scrive Document API uses HTTPS methods and RESTful endpoints to create,
edit, and manage the life-cycle of documents in the Scrive eSign system.
JSON is the data interchange format, but we also use query parameters.

The API is accessed through a versioned URL.
This allows users to clearly identify which API they are using, and to make
it easier to upgrade to any newer versions.
It also avoids having to use version codes in HTTP headers.

Any breaking changes to the API will be introduced through a new version
number.
We aim to keep these changes to a minimum, and when we do so, will support
the current API until it is phased out.

<aside class="success">
This document is for Version 2 of the Scrive Document API, which is the
latest version of our Document API.
</aside>

<aside class="notice">
Non-breaking changes may be introduced without changing version.
These may include additional fields to JSON data structures, optional
parameters to API calls, new features that can be exposed through existing
API calls, or new API calls.
</aside>

<aside class="notice">
Always use UTF-8 encoding.
This is the only officially supported encoding for our API.
</aside>

## Changelog
We will list any changes to the current version of the API here.

| Date        | Details of changes                                         |
| ----------- | ---------------------------------------------------------- |
| 2020-06-29  | Added documentation for custom SMS messages. |
| 2020-06-15  | View Folder endpoint: added `recursive` parameter and fields: `home_for_user`, `home_for_user_group`. |
| 2020-06-02  | Add Onfido authentication to sign methods, also add missing `fi_tupas` for setauthenticationtosign`. |
| 2020-05-08  | Added IP address to [Environments & IP Addresses](#environments-amp-ip-addresses). |
| 2020-04-20  | Added `nl_idin` and `fi_tupas` to various `authentication_method_to_*`. |
| 2020-04-02  | Updated endpoint list to include missing ip-addresses. |
| 2020-03-04  | Add user tags API. |
| 2020-02-21  | Change the format of user group tags. |
| 2020-01-28  | Add support for tags in the user group API. |
| 2020-02-05  | Change `getbyshortid` limit from 24 hours from created/modified time, to 72 hours from created time. |
| 2019-11-25  | Add folder API documentation. |
| 2019-11-15  | Update production IP addresses. |
| 2019-09-30  | Add `verimi` to `authentication_to_view`. |
| 2019-08-15  | Add access control API documentation. |
| 2019-07-19  | Add user and user group API documentation. |
| 2019-04-09  | Documented link confirmation delivery. |
| 2019-04-01  | Reordered the changelog - new changes are now on top. |
| 2019-03-27  | Clarified cases where fields can also have a null value. |
|             | Clarified use of `authentication_method_to_*` |
| 2019-02-25  | Add `gettokenforpersonalcredentials` endpoint and update `getpersonaltoken` to accept `login_token`s |
| 2019-02-18  | Add monitoring endpoint which was already implemented but missing from this document |
| 2019-01-03  | Add `usagestats` endpoints
| 2018-12-17  | Add `fi_tupas` (Finnish EID) to `authentication_method_to_view`/`authentication_method_to_view_archived` |
|             | Add documentation for `/documents/trash` and `/documents/delete` bulk endpoints |
|             | Add documentation for `authentication_method_to_view_archived` |
|             | New signatory role: approver. New `Signatory` field `signatory_role`, supercedes `is_signatory`. |
| 2018-06-01  | Add `dk_nemid` (Danish NemID) to `authentication_to_sign` |
| 2018-04-09  | Add a new field to the [Signatory JSON](#signatory): `consent_module` |
| 2018-03-29  | Fix an omission where `no_bankid` (Norwegian BankID) was missing as an Authentication to Sign |
| 2018-03-26  | Add `rejection_reason` to the Signatory JSON and an API endpoint to control [template sharing](#share-or-unshare-templates) |
| 2018-02-28  | Fix a minor error in the [Quick Start](#quick-start) guide |
| 2018-01-29  | Add an endpoint to [change the email and mobile number of a signatory](#change-the-email-and-mobile-number-of-a-signatory) |
| 2018-01-08  | Add an endpoint to [get a sign link as a QR code](#get-a-sign-link-as-a-qr-code) |
| 2017-11-15  | Custom validations for the `SignatoryFieldCustomField` are now supported |
| 2017-08-03  | Revamped definitions of signatory fields, it should now be much clearer |
|             | Added `SignatoryFieldRadiogroup`, Scrive now supports radio button fields |
|             | Factor out `SignatoryFieldStandard` into `SignatoryFieldEmailMobile` to allow for `editable_by_signatory` property |
| 2017-07-04  | Remove a comment about anchoring that was due to a bug, which has now been fixed |
| 2017-06-08  | Add `required` field to signatory attachments, optional attachments are now possible |
| 2017-05-15  | Add missing `company` standard signatory field             |
| 2017-03-11  | Add `dk_nemid` (Danish NemID) to `authentication_to_view`  |
| 2017-01-28  | Documentation of `removepages` API call                    |
| 2017-01-17  | Add JSON fields related to highlighting                    |
| 2016-12-17  | New optional `no_attachments` parameter for the `forward` API call           |
| 2016-10-27  | Small improvements to documentation following internal and customer feedback |
| 2016-10-14  | Pre-release of Scrive Document API Version 2 |


## Environments & IP Addresses

This section provides details on the IP addresses used by the Scrive Service. You may want to whitelist
these addresses in your firewalls for outgoing traffic but more importantly for incoming traffic from
Scrive eSign when using callbacks.

<aside class="warning">
Do not call the API using these IP addresses directly! Server Name Identification (SNI) is used to
route calls to different services on the same IP address and thus hostnames must be used to reliably reach
the service you intend to integrate with.
</aside>


### Production
The main application is available through the `scrive.com` domain.

<aside class="notice">
This is the live production environment, for testing, please use API Testbed.
</aside>

The IP addresses that may be used as endpoints to and from our system are:

* 46.51.201.244
* 52.208.49.53
* 54.229.202.191
* 54.246.132.30
* 54.72.249.47
* 54.72.251.235
* 34.251.5.243
* 52.208.131.2
* 99.80.133.235

### API Testbed

A testing environment is available through the `api-testbed.scrive.com`
domain.

This environment should be used when developing an integration with the
Scrive eSign system.

<aside class="warning">
This is not to be used with any critical information.
We make no guarantees as to the availability of the server, or the data
stored by it.
</aside>

We usually deploy the latest production environment to our API testbed, but
may occasionally update it with newer builds, which may not be as reliable
or well tested.

The API testbed uses `54.229.20.170` as its IP address.

## API Explorer
An interactive API Explorer is available for both environments:

* [API Testbed](https://api-testbed.scrive.com/api-explorer)
* [Production](https://scrive.com/api-explorer)

This is useful way to test API calls and the OAuth workflow.

The implementation is in JavaScript and you can use
[Firebug](https://getfirebug.com/) or the
[Google Chrome DevTools](https://developer.chrome.com/devtools) to inspect
HTTP requests.

## Upgrading from Version 1
There is no change to the Document workflow from Version 1 of the API.
The main changes in this version, compared to Version 1, are:

* A new naming structure for API endpoints
* Changes to the JSON data structures
* Changes to parameters and their names
* More comprehensive documentation
* Better error messages

The root endpoint for Version 1 was `/api/v1`, this has changed to
`/api/v2/documents`.

Most of the parameters have had minor name changes to make it easier for
newcomers to use.
However, the parameters for the `/list` call have undergone significant
structural changes.

<aside class="notice">
The most important things to watch for when upgrading from Version 1, apart
from those listed above:
</aside>

* The Document JSON structure has changed, and fields have been renamed
* The list call returns the full Document JSON for all documents, make sure
  you include `gzip` in your `Accept-Encoding` header to avoid large
  response sizes.

The following table summarises the changes in naming of the API calls.
For details of the new parameters and JSON data structures, please consult
the documentation.

| API endpoint in Version 1 (`/api/v1`)                        | Equivalent API endpoint in Version 2 (`/api/v2/documents`)  |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| `/list`                                                      | `/list`                                                     |
| `/createfromfile`                                            | `/new`                                                      |
| `/createfromtemplate/$template_id$`                          | `/newfromtemplate/{template_id}`                            |
| `/changemainfile/$documentid$`                               | `/{document_id}/setfile`                                    |
| `/update/$documentid$`                                       | `/{document_id}/update`                                     |
| `/ready/$documentid$`                                        | `/{document_id}/start`                                      |
| `/cancel/$documentid$`                                       | `/{document_id}/cancel`                                     |
| `/get/$documentid$`                                          | `/{document_id}/get`                                        |
| `/delete/$documentid$`                                       | `/{document_id}/trash`                                      |
| `/reallydelete/$documentid$`                                 | `/{document_id}/delete`                                     |
| `/remind/$documentid$`                                       | `/{document_id}/remind`                                     |
| `/setattachments/$documentid$`                               | `/{document_id}/setattachments`                             |
| `/downloadmainfile/$documentid$/$any_name$.pdf`              | `/{document_id}/files/main/{filename}`                      |
| `/downloadfile/$documentid$/$fileid$/$any_name$.pdf`         | `/{document_id}/files/{file_id}/{filename}`                 |
| `/changeauthenticationtoview/$documentid$/$signatorylinkid$` | `/{document_id}/{signatory_id}/setauthenticationtoview`     |
| `/changeauthentication/$documentid$/$signatorylinkid$`       | `/{document_id}/{signatory_id}/setauthenticationtosign`     |

# Quick Start
To get started using our API it is recommended to first read the
[Introduction](#introduction), this will give you an overview of some key
concepts in use by the Scrive eSign system.

Once you are familiar with the basic concepts the simplest document workflow
can be achieved by:

1. Creating a new document using `api/v2/documents/new`
   (see [New Document](#new-document))
2. Updating the document with the desired process options and signatory
   details using `api/v2/documents/{document_id}/update`
   (see [Update a document](#update-a-document))
3. Start the signing process with `api/v2/documents/{document_id}/start`
   (see [Start the signing process](#start-the-signing-process))

# Introduction
Scrive eSign is a system for signing documents electronically.

Users need to create an account with Scrive to create and send Documents,
but recipients do not need to have an account.

Documents in the Scrive eSign system define the parties to the document,
including the information these parties parties should fill out, the
document workflow, such as delivery and authentication for the parties, and
many other features related to the E-signing of documents as provided by
Scrive.

The Scrive Document API uses the Document JSON data structure to represent
Documents in the Scrive eSign system.
These always include an array of `parties`, which are either signing or
non-signing parties to the document, and represent the workflow assigned to
that party, and their individual information.
These use the Signatory JSON data structure.

We will first talk about the Document JSON, followed by the Signatory JSON.
For the reference documentation about these data structures please see the
[Definitions](#definitions).

## Documents
A core data structure used throughout the API is the Document JSON.
The Document JSON is used to create documents, define the workflow for
signing and non-signing parties, monitor the progress of the document, etc.

A key property of a document is its `status` (as defined by
[DocumentStatus](#document-status)).

Newly created documents have `status: "preparation"` and can be easily
modified.
Most changes to the Document at this stage are done using the Document
`update` API call, by passing a Document JSON with values updated as
necessary.
Not all fields can be updated in this way.
For example, the Document’s `id` is auto-generated and cannot be changed.
For details of which fields cannot be updated in this way, look for the
`readOnly` property in the Document [Definitions](#definitions).

Once the document signing process has been started, using the `start` API
call, the `status` will change to `"pending"` and relatively few
modifications by the author are possible.
Making the `start` API call will also deliver the document to the parties,
depending on the delivery methods set (e.g. by email or SMS).

After all signing parties have successfully signed the document, its status
will change to `"closed"`, after which it cannot be modified.

A pending document can also be cancelled by the author using the `cancel`
API call, or rejected by a signing party, resulting in its status being
`"cancelled"` or `"rejected"`, respectively.

Any actions performed by parties to a document, such as signing, can only
be performed in the web application interface.
We will not provide an API for such actions.

**The following diagram provides a rough overview of the document lifecycle:**
<img alt="Document workflow diagram" src="data:image/png;base64,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"/>

Please refer to `Document` in the [Definitions](#definitions) for a
detailed description of all the fields available, and their use.

## Templates
It is possible to set up template documents to be used with the "new
document from template" API call.

Any document in preparation can be made into a template by executing an
update call and setting the `"template"` field to be `true`. This cannot be
reversed once set, and templates cannot direclty be made into documents for
signing.

Templates have the same JSON structure as regular documents and can also be
updated.
In particular, their `"id"` can be used to
[create a new document from a template](#new-document-from-template).
Updating a template will only affect documents created from a template
*after* the template was updated.

Finally, using the list call, it is possible to list all your available
templates by setting the appropriate filters.

## Parties
Every Document has an array field named `parties`.
This defines the signing and viewing parties to a document, their details,
how the document is to be delivered to them, an extra authentication that
must be performed, etc.

It is possible to add an extra party to a Document in preparation using the
`update` call.
Simply add an extra empty object (*i.e.* `{ }`) to the list of existing
parties and the Scrive API will return an additional party populated using
default values.

Each party has a unique `id`, which we refer to as the `signatory_id`.
As with Documents, not all fields may be changed using the `update` call.

For details of this data structure, please refer to `Signatory` in the
[Definitions](#definitions).

## Callbacks
The Scrive eSign system can trigger API callbacks when some significant
property of a Document changes, as for example, when a signing party signs
the Document.

For callbacks to be triggered, you need to set the `api_callback_url` value
on the Document.
You can also trigger callbacks manually using the `callback` API call (this
call has no effect if the `api_callback_url` is not set).

For certain use cases it is possible to instead have a "User callback
scheme" defined.
You will need to contact us to set this up, and setting callbacks on
Documents is the preferred solution.

The Scrive eSign system will perform an `HTTP POST` request, with the
following `POST` parameters:

* `document_id`: As the name implies, the unique Document ID
* `document_json`: The Document JSON, see [Definitions](#definitions)
* `document_signed_and_sealed`: A boolean `true` or `false`, which indicates
  whether the document has been signed and sealed with a digital signature

There will generally be two callbacks executed with
`document_signed_and_sealed` set to `true`.
The first will be shortly after all signing parties have signed the document
and Scrive has applied a digital signature, and the second will be
issued when a keyless signature has been applied to the document.
This usually happens between 15-30 days after the original signing date.

We guarantee to make *at least* one callback when the Document status
changes to one of the following values:

* `pending`
* `closed`
* `canceled`
* `timedout`
* `rejected`

We cannot guarantee to make only one callback per status change, and we may
trigger callbacks for changes not listed here.
Furthermore, a callback does not indicate _what_ changed in a document, it
simply tells you the current state of a document.
Finally, callbacks will not be triggered for documents that have been
deleted.

The Scrive eSign system will look at the HTTP response code returned by the
callback URL.
If it is not an HTTP `2xx` response, then the callback will be retried in
increasing intervals, the first after 5 minutes.
After 10 failed attempts, we will no longer attempt the callback.

We may modify the specifics of this behaviour without notice.

# Authentication
The Scrive Document API supports OAuth 1.0 and personal access credentials
based on this.

Where your application needs to perform actions on behalf of Users, the
recommended approach is to use the full OAuth workflow.

## Personal Access Credentials
> You can retrieve personal access credentials for a user account using a
> special endpoint and supplying their login details.
>
> Using cURL, you can do:

```bash
curl -X POST 'https://{server_address}/api/v2/getpersonaltoken' \
  --data-urlencode 'email={user_email}' \
  --data-urlencode 'password={user_password}'
```

> Replacing `{server_address}`, `{user_email}` and `{user_password}` to
> the appropriate values.
>
> Or, if you are using the `login_token` method:

```bash
curl -X POST 'https://{server_address}/api/v2/getpersonaltoken' \
  --data-urlencode 'login_token={login_token}'
```

> Replacing `{server_address}`, `{login_token}` to the appropriate values.
>
> These two methods will both return the personal access tokens as a JSON:

```json
{
  "apitoken" : "987dfsd312sd76sh_123"
, "apisecret" : "c47b87126dsacbhb"
, "accesstoken" : "2d1287dassg22jke_114"
, "accesssecret" : "12876adsdhght665"
}
```

> Then, given the following example personal access credentials:
>
> * Client credentials identifier:
>   `apitoken = 123`
> * Client credentials secret:
>   `apisecret = abc`
> * Token credentials identifier:
>   `accesstoken = 456`
> * Token credentials secret:
>   `accesssecret = cde`
>
> The following authorisation header can be used:
>
> `Authorization: oauth_signature_method="PLAINTEXT", oauth_consumer_key="123", oauth_token="456",  oauth_signature="abc&cde"`

Instead of OAuth, clients may access the Scrive API using personal access
credentials.
A user can create personal access credentials in the [Scrive Account
Section](https://scrive.com/account#api-dashboard) through the web
interface, or using a dedicated API call, as described in the right column.

Only one personal token is available per user.
Such credentials can be used instead of OAuth client and token credentials
in API calls.
The personal access credentials are associated with the user and can be
used instead of any other OAuth privileges, they are intended for special
cases where OAuth is not a viable option, or for getting started quickly in
a sandbox environment.

There are two ways to use this endpoint. One is to provide the username and
password of the user you are creating the personal access credentials for.
The other is to provide a `login_token`. These are temporary tokens created
by the `gettokenforpersonalcredentials` endpoint. These are demonstrated in
the sidebar.

<aside class="warning">
Storing personal access tokens outside of the Scrive eSign system is
equivalent to storing a user password.

Due to this, we do recommend using OAuth where possible.
</aside>

## OAuth

Managing API access is done through a Scrive user account, and each user
account may have zero or more client credentials.
These client credentials are managed in the [Integration settings
tab](https://scrive.com/account#api-dashboard) of the user account
settings.

These client credentials may be used to request privileges from users.
Users, in turn, can approve or deny granting such privileges.
They may also remove privileges as they see fit, from the Integration
settings tab.

The OAuth authorisation sequence allows you to request privileges from a
user and retrieve token credentials.
Once these have been approved, you may use the token credentials to make
API requests on behalf of the user.

### OAuth privileges
The current API version accepts the following privileges names:
`DOC_CREATE`, `DOC_CHECK`, and `DOC_SEND`.

Permission levels required for each API call are described on a per call
basis.

### OAuth and Cookies
As the Scrive eSign web interface uses the Scrive API, all API calls
support two modes of authentication: OAuth based, and browser cookie based.
If the `Authorization` header is set, any browser cookies are ignored.

### OAuth 1.0 Workflow
> ### OAuth Workflow using cURL
> Here we provide some examples using the cURL command.
>
> **1. Temporary credentials request using cURL and response:**

```bash
$ curl 'https://${host}/oauth/temporarycredentials?privileges=DOC_CREATE%2BDOC_SEND' \
  -H 'Authorization: oauth_realm="Scrive",oauth_signature_method="PLAINTEXT",oauth_consumer_key="4d224b89875b39af_2",oauth_signature="f446cae781995b05&aaaaaa",oauth_callback="http://www.mywebsite.com/scrive"'

oauth_token=b0d6be3270a2b3ad_8&oauth_token_secret=dac0ec76e037c01d&oauth_callback_confirmed=true
```

> **2. Now redirect the user to:**

```
https://${host}/oauth/authorization?oauth_token=b0d6be3270a2b3ad_8
```

> If the user grants access to your application, they will be redirected to:

```
http://www.mywebsite.com/scrive?=&oauth_token=b0d6be3270a2b3ad_8&oauth_verifier=6382be3e8fcafd94
```

> **3. You should now request for an OAuth token using all the information:**

```
$ curl '${host}/oauth/tokencredentials' \
  -H 'Authorization: oauth_realm="Scrive",oauth_signature_method="PLAINTEXT",oauth_consumer_key="4d224b89875b39af_2",oauth_signature="f446cae781995b05&dac0ec76e037c01d",oauth_token="b0d6be3270a2b3ad_8",oauth_verifier="6382be3e8fcafd94"'

oauth_token=0e870aa5ff434d5a_2&oauth_token_secret=22adb49346ba7674
```

> You should now be able to perform an API call, for example:

```
curl -X POST '${host}/api/v2/documents/new' \
  -H 'Authorization: oauth_realm="Scrive",oauth_signature_method="PLAINTEXT",oauth_consumer_key="4d224b89875b39af_2",oauth_signature="f446cae781995b05&22adb49346ba7674",oauth_token="0e870aa5ff434d5a_2"'
```

The OAuth workflow consists of three steps, which we will describe in turn:

1. Temporary credentials request and response
2. Authorisation redirect
3. Token request and response

**1. Temporary Credentials**

You must first request temporary credentials using the client credentials
identifier and secret from your account’s [Integration settings
tab](https://scrive.com/account#api-dashboard).

To do so you must issue a `GET` request to
`https://${host}/oauth/temporarycredentials?privileges=${privileges}` with
the following parameters in the `authorization` header:

* `oauth_signature_method="PLAINTEXT"`
* `oauth_consumer_key="${consumer_key}"`
* `oauth_signature="${consumer_secret}&aaaaaa"`
* `oauth_callback="${oauth_callback_url}"`

`${privileges}` must be separated by a `+`, for example
`"DOC_CREATE+DOC_SEND"` (or `%2B` when URL encoded).
You can set `${oauth_callback_url}` to what you like, but it must be set.
The `oauth_signature` must be appended with a dummy `&aaaaaa` at this
stage, it will be replaced with other tokens later.

The reponse should include an `oauth_token`, `oauth_token_secret`, and
`oauth_callback_confirmed=true`.

**2. Authorisation redirect**

You must now redirect the User to
`https://${host}/oauth/authorization?oauth_token=${oauth_token}` using the
`oauth_token` from the previous step.

The user will be asked to grant you the requested privileges, displaying
your company name.

If they accept, they will be redirected to:

* `${oauth_callback}?=&oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`

If they reject, the redirection will be to:

* `${oauth_callback}?=&oauth_token=${oauth_token}&denied=true`

Therefore, you should be able to inspect the redirection to the callback
URL.

**3. Token request**

Now you should have the following pieces of information:

* `oauth_consumer_key`
* `oauth_token`
* `oauth_verifier`

We then use `oauth_signature_method="PLAINTEXT"` and construct a new
`oauth_signature` from the client credentials secret and temporary
credentials secret:

* `oauth_signature_method="PLAINTEXT"`
* `oauth_signature="${consumer_secret}&${oauth_token_secret}"`

Finally, we wrap all of this into the `Authorization` header to
`https://${host}/oauth/tokencredentials` and get back an `oauth_token` and
`oauth_token_secret`.

We can now make API calls on behalf of the User by including the finalised
tokens in the `Authorization` header:

* `oauth_consumer_key`
* `oauth_token`
* `oauth_signature_method="PLAINTEXT"`
* `oauth_signature`

# Errors

> Error responses will contain a JSON response body, structured as follows:

```plaintext
{
  "error_type": "$error_type$"
, "error_message": "$error_message$"
, "http_code": $http_code$
}
```

> For example:

```json
{
  "error_type": "resource_not_found"
, "error_message": "The resource was not found. A document with id $id$ was not found."
, "http_code": 404
}
```

Scrive uses HTTP status codes to indicate the success or failure of an API
request.

HTTP response codes in the `2xx` range indicate that the API call completed
successfully.
The `4xx` range indicates an error, either due to missing, incomplete, or
not applicable information (e.g. missing or invalid parameters, invalid
authorisation, etc.).

When a request is well formed, but does not satisfy necessary conditions,
then we will return a `409` code.
For example, when trying to start the signing process for a document that
has already been signed.

Codes in the `5xx` range suggest an error with Scrive’s eSign system, they
could also indicate planned system downtime, and will be rare.

The following table of error responses applies to all API calls, there may
be additional errors which are specific to the respective API calls, but
will follow the same structure.

<table>
<thead>
  <tr> <th>HTTP code</th> <th>Reason</th> <th>Error Type and Message</th> </tr>
</thead>
<tbody>

  <tr>
    <td>400 Bad Request</td>
    <td>Obligatory parameters were missing</td>
    <td>
      <p><code>request_parameters_missing</code><p>
      <p>
        The parameter(s) <code>$bad_parameters$</code> were missing.
        Please refer to our API documentation.
      </p>
    </td>
  </tr>

  <tr>
    <td>400 Bad Request</td>
    <td>Parameter(s) could not be parsed</td>
    <td>
      <p><code>request_parameters_parse_error</code><p>
      <p>
        The parameter(s) <code>$bad_parameters$</code> could not be parsed.
        Please refer to our API documentation.
      </p>
      <p>
        <em>Some debugging information may also be present, detailing why
        parsing failed.</em>
      </p>
    </td>
  </tr>

  <tr>
    <td>400 Bad Request</td>
    <td>Parameter(s) were present and could be parsed, but were not valid.</td>
    <td>
      <p><code>request_parameters_invalid</code><p>
      <p>
        <em>Error message should detail what is wrong with the parameter(s).</em>
      </p>
    </td>
  </tr>

  <tr>
    <td>401 Unauthorised</td>
    <td>No or invalid access credentials</td>
    <td>
      <p><code>invalid_authorisation</code><p>
      <p>
        No valid access credentials were provided.
        Please refer to our API documentation.
      </p>
    </td>
  </tr>

  <tr>
    <td>403 Forbidden</td>
    <td>Insufficient access privileges for request</td>
    <td>
      <p><code>insufficient_privileges</code><p>
      <p>
        The access credentials provided do not have sufficient privileges
        for this request.
      </p>
    </td>
  </tr>

  <tr>
    <td>403 Forbidden</td>
    <td>User doesn’t have permission for a document action or retrieval</td>
    <td>
      <p><code>document_action_forbidden</code><p>
      <p>
        You do not have permission to perform this action on the document.
      </p>
    </td>
  </tr>

  <tr>
    <td>404 Not Found</td>
    <td>Non existent API endpoint</td>
    <td>
      <p><code>endpoint_not_found</code><p>
      <p>
        The endpoint was not found.
        See our website for API documentation.
      </p>
    </td>
  </tr>

  <tr>
    <td>404 Not Found</td>
    <td>The endpoint exists but the resource was not found.</td>
    <td>
      <p><code>resource_not_found</code><p>
      <p>
        The resource was not found.
      </p>
      <p>
        <em>We will try to give additional information about what is missing.</em>
      </p>
    </td>
  </tr>

  <tr>
    <td>409 Conflict</td>
    <td>The document’s <code>object_version</code> does not match</td>
    <td>
      <p><code>document_object_version_mismatch</code><p>
      <p>
        The document has a different <code>object_version</code> to the one
        provided and so the request was not processed.
      </p>
    </td>
  </tr>

  <tr>
    <td>500 Server Error</td>
    <td>Other unexpected server error</td>
    <td>
      <p><code>server_error</code><p>
      <p>
        We encountered an unexpected error.
        Please contact Scrive support and include as much details about
        what caused the error, including the <code>document_id</code> and
        any other details.
      </p>
    </td>
  </tr>

</tbody>
</table>

<aside class="notice">
API version 1 could return HTTP <code>5xx</code> codes for errors that were not due to
Scrive eSign.
The information presented here thus only applies for the current version of
the API.
</aside>

We recommend writing integration code that handles the possibility of the
Scrive eSign system returning errors.


# List of API Calls

## Monitor


<p>
<a href="#apiv2monitorstatus">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/monitor/status</code>
</strong>
</a>
</p>

## Prepare


<p>
<a href="#apiv2documentsnew">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/new</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documentsnewfromtemplate{document_id}">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/newfromtemplate/{document_id}</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}clone">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/clone</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}update">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/update</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}setfile">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/setfile</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}setattachments">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/setattachments</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}removepages">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/removepages</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}start">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/start</code>
</strong>
</a>
</p>

## Get


<p>
<a href="#apiv2documents{document_id}get">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/{document_id}/get</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{short_document_id}getbyshortid">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/{short_document_id}/getbyshortid</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}{signatory_id}getqrcode">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/{document_id}/{signatory_id}/getqrcode</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documentslist">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/list</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}filesmain{filename}">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/{document_id}/files/main/{filename}</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}files{file_id}{filename}">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/{document_id}/files/{file_id}/{filename}</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}history">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/{document_id}/history</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}callback">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/callback</code>
</strong>
</a>
</p>

## Modify


<p>
<a href="#apiv2documents{document_id}remind">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/remind</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}prolong">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/prolong</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}cancel">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/cancel</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}trash">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/trash</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documentstrash">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/trash</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}delete">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/delete</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documentsdelete">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/delete</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}forward">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/forward</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}setautoreminder">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/setautoreminder</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}restart">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/restart</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}{signatory_id}setauthenticationtoview">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/{signatory_id}/setauthenticationtoview</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}{signatory_id}setauthenticationtosign">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/{signatory_id}/setauthenticationtosign</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documents{document_id}{signatory_id}changeemailandmobile">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/{signatory_id}/changeemailandmobile</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2documentstemplatessetsharing">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/templates/setsharing</code>
</strong>
</a>
</p>

## Attachment


<p>
<a href="#apiv2attachmentslist">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/attachments/list</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2attachments{attachment_id}download{filename}">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/attachments/{attachment_id}/download/{filename}</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2attachmentsnew">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/attachments/new</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2attachmentsdelete">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/attachments/delete</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2attachmentssetsharing">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/attachments/setsharing</code>
</strong>
</a>
</p>

## User


<p>
<a href="#apiv2loginandgetsession">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/loginandgetsession</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2gettokenforpersonalcredentials{user_id}">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/gettokenforpersonalcredentials/{user_id}</code>
</strong>
</a>
</p>

<p>
<a href="#apiv22fasetup">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/2fa/setup</code>
</strong>
</a>
</p>

<p>
<a href="#apiv22faconfirm">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/2fa/confirm</code>
</strong>
</a>
</p>

<p>
<a href="#apiv22fadisable">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/2fa/disable</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2isuserdeletable">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/isuserdeletable</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2deleteuser">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/deleteuser</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2dataretentionpolicy">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/dataretentionpolicy</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2dataretentionpolicyset">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/dataretentionpolicy/set</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usertags">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usertags</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usertagsupdate">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usertags/update</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usagestatsdays">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usagestats/days</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usagestatsmonths">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usagestats/months</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2signup">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/signup</code>
</strong>
</a>
</p>

## User Group


<p>
<a href="#apiv2usergroupscreate">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/create</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usergroups{user_group_id}">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usergroups/{user_group_id}</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usergroups{user_group_id}update">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/{user_group_id}/update</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usergroups{user_group_id}delete">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/{user_group_id}/delete</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usergroups{user_group_id}contact_details">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usergroups/{user_group_id}/contact_details</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usergroups{user_group_id}contact_detailsupdate">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/{user_group_id}/contact_details/update</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usergroups{user_group_id}contact_detailsdelete">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/{user_group_id}/contact_details/delete</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usergroups{user_group_id}settings">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usergroups/{user_group_id}/settings</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usergroups{user_group_id}settingsupdate">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/{user_group_id}/settings/update</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usergroups{user_group_id}settingsdelete">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/{user_group_id}/settings/delete</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2usergroups{user_group_id}users">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usergroups/{user_group_id}/users</code>
</strong>
</a>
</p>

## Access Control


<p>
<a href="#apiv2getuserroles{user_id}">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/getuserroles/{user_id}</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2accesscontrolroles{role_id}">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/accesscontrol/roles/{role_id}</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2accesscontrolroles{role_id}add">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/accesscontrol/roles/{role_id}/add</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2accesscontrolroles{role_id}delete">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/accesscontrol/roles/{role_id}/delete</code>
</strong>
</a>
</p>

## Folders


<p>
<a href="#apiv2folders{folder_id}">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/folders/{folder_id}</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2folderscreate">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/folders/create</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2folders{folder_id}update">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/folders/{folder_id}/update</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2folders{folder_id}delete">
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/folders/{folder_id}/delete</code>
</strong>
</a>
</p>

<p>
<a href="#apiv2folders{folder_id}list">
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/folders/{folder_id}/list</code>
</strong>
</a>
</p>

# Monitor

<div><a id="apiv2monitorstatus"></a></div>
## Get the system status

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/monitor/status</code>
</strong>
</p>

Check the system status, no API credentials required.


### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>A simple JSON response with the system status:
<code>{&quot;status&quot;:&quot;ok&quot;}</code></p>
<p>Any other response implies there are system issues.
We may add more fields and more details in the future.</p>
</td> </tr>
</table>


# Prepare

<div><a id="apiv2documentsnew"></a></div>
## New document

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/new</code>
</strong>
</p>

> ### Example

```bash
curl -X POST 'https://{server_address}/api/v2/documents/new' \
  -H 'Authorization: oauth_signature_method="PLAINTEXT",oauth_consumer_key="${apitoken}",oauth_token="${accesstoken}",oauth_signature="${apisecret}&${accesssecret}"'
```

> The above example uses [personal access credentials](#personal-access-credentials) (see `-H` option), but can be easily updated to use [OAuth](#oauth).

Create a new document with the given PDF (if any) as the main file.
The new document will have state `Preparation`, and will not be a template.

If no PDF is provided, you can set one using the `{document_id}/setfile`
API call.

*OAuth Privileges required: `DOC_CREATE`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>file</code><br/><em>optional</em></p><p><em>default:</em> <code>No file</code></p></td><td><div class="description"><p><strong>The PDF to use for the document.</strong></p>
<p>If supplied, the document’s title will be set to the filename (with the
extensions removed).
Otherwise a default document title will be set, depending on the user
language settings.</p>
</div></td><td><p>file<br><em>application/pdf</em></p></td><td>formData</td></tr>
<tr><td><p><code>saved</code><br/><em>optional</em></p><p><em>default:</em> <code>true</code></p></td><td><div class="description"><p>Whether the document should start out as being &quot;saved&quot; (<em>i.e.</em> appear
in the E-archive).</p>
<p>The document can be &quot;saved&quot; later, by setting the &quot;saved&quot; field to
<code>true</code> via an <code>update</code> call.
All API operations are applied immediately, the &quot;saved&quot; flag simply
represents visibility in the E-archive.</p>
</div></td><td><p>boolean</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>201</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>400</td> <td><p>The parameter <code>file</code> could not be parsed.</p>
</td> </tr>
</table>



<div><a id="apiv2documentsnewfromtemplate{document_id}"></a></div>
## New document from Template

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/newfromtemplate/{document_id}</code>
</strong>
</p>

> ### Example

```bash
curl -X POST 'https://{server_address}/api/v2/documents/newfromtemplate/${document_id}' \
  -H 'Authorization: oauth_signature_method="PLAINTEXT",oauth_consumer_key="${apitoken}",oauth_token="${accesstoken}",oauth_signature="${apisecret}&${accesssecret}"'
```

> The above example uses [personal access credentials](#personal-access-credentials) (see `-H` option), but can be easily updated to use [OAuth](#oauth).

Create a new document from a template, given the document ID for a document that is a template.

The new document will have state `Preparation` and will not be a template, and the signing process can thus be carried out.

*OAuth Privileges required: `DOC_CREATE`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>201</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>409</td> <td><p>The document is not a template.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}clone"></a></div>
## Clone a document

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/clone</code>
</strong>
</p>

Clone an existing document, returning a new document in `Preparation`.

You can only clone documents for which you are the author, the new document
will use the current author details for the author signatory fields.

*OAuth Privileges required: `DOC_CREATE`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>201</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}update"></a></div>
## Update a document

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/update</code>
</strong>
</p>

> ### Example

```bash
curl -X POST 'https://{server_address}/api/v2/documents/${document_id}/update' \
  -H 'Authorization: oauth_signature_method="PLAINTEXT",oauth_consumer_key="${apitoken}",oauth_token="${accesstoken}",oauth_signature="${apisecret}&${accesssecret}"' \
  --data-urlencode 'document={ "id":"${document_id}", "parties": [{}] }' \
  --data-urlencode 'document_id=${document_id}'
```

> The above example uses [personal access credentials](#personal-access-credentials) (see `-H` option), but can be easily updated to use [OAuth](#oauth).

Update the metadata for a document in preparation.

*OAuth Privileges required: `DOC_CREATE`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>document</code><br/><em>required</em></p></td><td><div class="description"><p><strong>The document metadata</strong></p>
<p>Must be of type <code>Document</code>, see <a href="#definitions">Definitions</a>.</p>
<p>Can be a subset of the JSON structure, for example it is possible to
just update the title of a document with <code>{&quot;title&quot;: &quot;New title&quot;}</code>.</p>
<p>Not all fields can be set this way, please refer to the definitions for
details, those marked as read-only cannot be modified using this API
call.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>409</td> <td><p>The document status should be <code>Preparation</code>.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}setfile"></a></div>
## Set the Main File

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/setfile</code>
</strong>
</p>

Set or replace the main PDF file for a document in `Preparation`.

If the `file` parameter is blank, the main file for the document will be
removed (if any).

_A note about anchors:_
Signatory field placements with anchors are only recalculated if a main file
was already set on the document, as it requires the relative placement in
original file to recalculate placements for the new file.
Contact us to learn more about anchors, and discuss advanced features that
we may be able to offer you.

*OAuth Privileges required: `DOC_CREATE`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>file</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, the PDF will be set as the main file for the document.</p>
<p>If not provided, the current main file for the document will be removed.</p>
</div></td><td><p>file<br><em>application/pdf</em></p></td><td>formData</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>400</td> <td><p>The parameter <code>file</code> could not be parsed.</p>
</td> </tr>
<tr> <td>409</td> <td><p>The document status should be <code>Preparation</code>.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}setattachments"></a></div>
## Set Author Attachments

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/setattachments</code>
</strong>
</p>

> ### Example
>
> As this call can be a little tricky to understand, we provide a concrete
> example.
>
> Suppose we wanted to set two author attachments:
>
> 1. `terms_and_conditions.pdf`
> 2. `proof_of_purchase.pdf`
>
> To do this we would need to include the two files as form data in our
> request.
> We are then free to chose names for the form data elements, so suppose we
> chose `toc_file` for the first, and `proof_file` for the second.
>
> In this case the `attachments` JSON would need to resemble:

```json
[
  {
    "name": "Terms and Conditions",
    "required": true,
    "add_to_sealed_file": false,
    "file_param": "toc_file"
  },
  {
    "name": "Proof of purchase",
    "required": false,
    "add_to_sealed_file": true,
    "file_param": "proof_file"
  }
]
```

> And we would include our files as named form elements.

Set or remove author attachments for the document.

By default, it replaces any existing attachments, so all attachments must be
set by any use of this call. See the parameter `incremental` to change this
behaviour.

*OAuth Privileges required: `DOC_CREATE`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>attachments</code><br/><em>required</em></p></td><td><div class="description"><p><strong>List of author attachments.</strong></p>
<p>The list provided will replace any existing attachments (if any).
Therefore, to add an attachment to an existing list, you would need to
first fetch the existing attachments <code>file_id</code> and use it for this
call.</p>
<p><strong>Note:</strong> The JSON structure has two variants, one with <code>file_param</code> and
the other with <code>file_id</code>.</p>
<ul>
<li>
<p><code>file_param</code> refers to a named parameter that must also be included
in this API call.
This is the suggested way to include files.</p>
</li>
<li>
<p><code>file_id</code> refers to a file in the Scrive system.
You must have the rights to access the <code>file_id</code> to use it.</p>
</li>
</ul>
<p>Must be of type <a href="#author-attachments">Author Attachments</a>.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
<tr><td><p><code>{attachment_name}</code><br/><em>optional</em></p></td><td><div class="description"><p><strong>The named file parameters</strong></p>
<p>Any <code>file_param</code> in the <code>attachments</code> JSON must be supplied as named
file parameters.</p>
<p>If converting from API version 1, it is convenient to name these
parameters <code>attachment_1</code>, <code>attachment_2</code>, etc, and reference them as
such in the <code>attachments</code> JSON.
Although it is possible to use any HTTP compatible naming scheme.</p>
</div></td><td><p>file<br><em>application/pdf</em></p></td><td>formData</td></tr>
<tr><td><p><code>incremental</code><br/><em>optional</em></p><p><em>default:</em> <code>false</code></p></td><td><div class="description"><p>If set to <code>true</code>, this will make the API set the given author
attachments leaving all already set attachments intact.</p>
<p>For each given attachment, if there already is one with the same name,
it will get overwritten, otherwise, the attachment will be added.</p>
</div></td><td><p>boolean</p></td><td>formData</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>409</td> <td><p>The document status should be <code>Preparation</code>.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}removepages"></a></div>
## Remove pages

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/removepages</code>
</strong>
</p>

Remove some pages from main PDF file of a document in `Preparation`.

Checkboxes and signature areas that are placed on pages to be removed will
be removed from their respective signatory.
For standard and text fields, only the placements that are on the pages to
be removed will be removed, the signatory field will still exist.
As a consequence of removing pages, the `page` property of any placements
may change to account for any removed pages.

This operation will update the document’s `file` with a new one, that will
have the requested pages removed from its current main file.

*OAuth Privileges required: `DOC_CREATE`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>pages</code><br/><em>required</em></p></td><td><div class="description"><p>List of pages to be removed. Pages are indexed from 1.</p>
<p>To remove the first and last page, when the main file has 4 pages, set
this param to <code>[1,4]</code>.</p>
</div></td><td><p>array<br><em>[integer]</em></p></td><td>formData</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>400</td> <td><p>Parameter <code>pages</code> could not be parsed or given <code>pages</code> can't be removed from PDF:</p>
<ul>
<li>Parameter <code>pages</code> could not be parsed.</li>
<li>Pages parameter can't have more then 100 positions.</li>
<li>Pages parameter can't be an empty list.</li>
<li>Pages parameter can't contain duplicates.</li>
<li>Some page indexes lower then 1 or higher then number of pages.</li>
<li>Can't remove all pages from PDF.</li>
</ul>
</td> </tr>
<tr> <td>409</td> <td><p><code>document_state_error</code> with error messages:</p>
<ul>
<li>The document status should be <code>Preparation</code>.</li>
<li>Document does not have a main file.</li>
</ul>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}start"></a></div>
## Start the signing process

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/start</code>
</strong>
</p>

> ### Example

```bash
curl -X POST 'https://{server_address}/api/v2/documents/${document_id}/start' \
  -H 'Authorization: oauth_signature_method="PLAINTEXT",oauth_consumer_key="${apitoken}",oauth_token="${accesstoken}",oauth_signature="${apisecret}&${accesssecret}"' \
  --data-urlencode 'document_id=${document_id}'
```

> The above example uses [personal access credentials](#personal-access-credentials) (see `-H` option), but can be easily updated to use [OAuth](#oauth).

Start the signing process for a document in preparation.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>409</td> <td><p><code>document_state_error</code> with error messages:</p>
<ul>
<li>The document state must be 'Preparation'.</li>
<li>Document is a template, templates can not be started.</li>
<li>Document must have a file before it can be started.</li>
<li>The document has missing or invalid data. Some information about what
is missing or invalid in the document is given.</li>
</ul>
</td> </tr>
</table>


# Get

<div><a id="apiv2documents{document_id}get"></a></div>
## Get a document

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/{document_id}/get</code>
</strong>
</p>

Get the JSON metadata for a given `document_id`.

*OAuth Privileges required: `DOC_CHECK`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{short_document_id}getbyshortid"></a></div>
## Get by short ID

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/{short_document_id}/getbyshortid</code>
</strong>
</p>

**Get the Document JSON metadata using a short Document ID.**

This can only be used for documents created within the last 72 hours.
It can only be used for documents that are pending.
You can only get documents that you have access to.

*OAuth Privileges required: `DOC_CHECK`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>short_document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Last 6 digits of a regular Document ID.
Must be a pending document created within the last 72 hours.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>400</td> <td><p>The parameter <code>short_document_id</code> had the following problems: was
greater than 6 digits</p>
</td> </tr>
<tr> <td>404</td> <td><p>The resource was not found. A document matching short id
<code>short_document_id</code> was not found</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}{signatory_id}getqrcode"></a></div>
## Get a sign link as a QR code

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/{document_id}/{signatory_id}/getqrcode</code>
</strong>
</p>

Get a Scrive eSign link for a given signatory and document ID, encoded as a
QR code in PNG format. Only valid for pending documents.

The encoded link is of the form
`scrive://{hostname}/{document_id}/{signatory_id}/{token}` and is intended
to be used with our mobile applications available on the Apple App Store
and Google Play Store.

This endpoint will work irrespective of the delivery method set.
It will also work for viewing parties.

*OAuth Privileges required: `DOC_CHECK`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>signatory_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a signatory.
This value can change before document is made ready for signing, and should
not be used to identify signatories while document is a draft.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>PNG image, <code>content-type: image/png</code>.</p>
</td> </tr>
<tr> <td>409</td> <td><p><code>document_state_error</code> with message <em>The document state must be
'Pending'</em>.</p>
</td> </tr>
</table>



<div><a id="apiv2documentslist"></a></div>
## List documents

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/list</code>
</strong>
</p>

Fetch a list of documents, with filtering and sorting options.

*OAuth Privileges required: `DOC_CHECK`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>offset</code><br/><em>optional</em></p><p><em>default:</em> <code>0</code></p></td><td><div class="description"><p><strong>Starting offset for documents to return.</strong></p>
<p>If offset is larger than the total number of matching documents, an
empty list is returned.</p>
</div></td><td><p>integer<br><em>int32</em></p></td><td>query</td></tr>
<tr><td><p><code>max</code><br/><em>optional</em></p><p><em>default:</em> <code>100</code></p></td><td><div class="description"><p><strong>Maximum number of documents to return.</strong></p>
<p>Server may cap to a lower value.</p>
<p>Default value may change without notice.</p>
</div></td><td><p>integer<br><em>int32</em></p></td><td>query</td></tr>
<tr><td><p><code>filter</code><br/><em>optional</em></p><p><em>default:</em> <code>[]</code></p></td><td><div class="description"><p><strong>List of filtering options.</strong></p>
<p>You can supply a list of filtering options to apply.
Only documents that match <strong>all</strong> filters will be returned.
Therefore, it is easy to apply a set of filters that will return no
documents.</p>
<p>If not supplied, the default is not to apply any filter, i.e. <code>[]</code>.</p>
<p>Must be of type <a href="#list-filter">List Filter</a>, for example:</p>
<p><code>[ { &quot;filter_by&quot;:&quot;status&quot;, &quot;statuses&quot;: [&quot;preparation&quot;,&quot;pending&quot;] } ]</code></p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>query</td></tr>
<tr><td><p><code>sorting</code><br/><em>optional</em></p><p><em>default:</em> <code>[ { "sort_by":"mtime", "order":"descending" } ]</code></p></td><td><div class="description"><p><strong>List of sorting options.</strong></p>
<p>You can supply a list of sorting options, which will be applied to list
of documents in the order you provided.</p>
<p>If not supplied, the default is
<code>[ { &quot;sort_by&quot;:&quot;mtime&quot;, &quot;order&quot;:&quot;descending&quot; } ]</code>,
<em>i.e.</em>, sort by modification time, newest first.</p>
<p>Must be of type <a href="#list-sorting">List Sorting</a>.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>query</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>A JSON object containing the total number of matching documents, and an
array of documents.</p>
<p>The <code>total_matching</code> value is capped at 1,000 + <code>offset</code>.
Therefore, further API calls will be needed with a higher <code>offset</code> if
the <code>total_matching</code> is 1,000.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}filesmain{filename}"></a></div>
## Get the main file

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/{document_id}/files/main/{filename}</code>
</strong>
</p>

**Get the main PDF file for a document.**

The optional `filename` parameter in the URL can be set to any valid file name.
This allows you to download the file with user-specified file name in the
browser.

*OAuth Privileges required: `DOC_CHECK`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>filename</code><br/><em>optional</em></p></td><td><div class="description"><p>Optional filename parameter.</p>
</div></td><td><p>string</p></td><td>path</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The PDF file.</p>
</td> </tr>
<tr> <td>503</td> <td><p>Error message:
<em>The sealed PDF for the document is not ready yet, please wait and try again.</em></p>
<p>This happens immediately after all signatories have signed (<em>i.e.</em>
Document status is <code>closed</code>), as Scrive eSign is preparing the
finalised PDF.
It should not take more than ~10 seconds for the finalised PDF to be
available.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}files{file_id}{filename}"></a></div>
## Get a related file

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/{document_id}/files/{file_id}/{filename}</code>
</strong>
</p>

**Get a file related to a document.**

This can be used to get author or signatory attachments by looking up their
respective `file_id` the Document JSON.

The optional `filename` parameter in the URL can be set to any valid file name.
This allows you to download the file with user-specified file name in the
browser.

*OAuth Privileges required: `DOC_CHECK`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>file_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a file available via Scrive.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The file</p>
<p>Usually an image (JPG, PNG) or PDF, but this may change.
<code>Content-Type</code> header will be set according to the file type.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}history"></a></div>
## Get the Document History

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/documents/{document_id}/history</code>
</strong>
</p>

**Get the document history to display to the user.**

Default language for the document history text is the one set for the user
making the API call.
This can optionally be overridden.

*OAuth Privileges required: `DOC_CHECK`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>lang</code><br/><em>optional</em></p><p><em>default:</em> <code>User language</code></p></td><td><div class="description"><p><strong>The language used to display the document history.</strong></p>
<p>Defaults to the language of the User making the API call.</p>
<p>Has to be a supported language code.
Languages may be added or removed without notice.</p>
</div><div class="enumeration"><strong>Enum:</strong> <code>da</code>, <code>de</code>, <code>el</code>, <code>en</code>, <code>es</code>, <code>et</code>, <code>fi</code>, <code>fr</code>, <code>is</code>, <code>it</code>, <code>lt</code>, <code>lv</code>, <code>nl</code>, <code>no</code>, <code>pt</code>, <code>sv</code></div></td><td><p>string</p></td><td>query</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The list of history items for this document.</p>
<p>Will be in reverse-chronological order and an array of
<a href="#history-items">History Items</a>.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}callback"></a></div>
## Trigger an API callback

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/callback</code>
</strong>
</p>

Explicitly trigger an extra API callback to the URL set for the document.
If one is set, no effect otherwise.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>202</td> <td><p>A callback will be triggered for the document if a User or Document
callback URL was set.</p>
</td> </tr>
<tr> <td>409</td> <td><p>Can not send callbacks for documents in Preparation.</p>
</td> </tr>
</table>


# Modify

<div><a id="apiv2documents{document_id}remind"></a></div>
## Remind signatories

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/remind</code>
</strong>
</p>

Send a reminder invitation message to all signatories that have not yet
signed.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>202</td> <td><p>The call succeeded, reminders have been queued and will be sent to all
signatories that have not yet signed.</p>
</td> </tr>
<tr> <td>409</td> <td><p>The document status should be <code>Pending</code>.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}prolong"></a></div>
## Prolong a document

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/prolong</code>
</strong>
</p>

Prolong a document that has timed out.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>days</code><br/><em>required</em></p></td><td><div class="description"><p>Number of days to prolong the document by.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>400</td> <td><p>The <code>days</code> parameter must be a number between 1 and 90.</p>
</td> </tr>
<tr> <td>409</td> <td><p>The document has not timed out.
Only timed out documents can be prolonged.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}cancel"></a></div>
## Cancel a pending document

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/cancel</code>
</strong>
</p>

Cancel a pending document.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>409</td> <td><p>The document state is not <code>Pending</code>.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}trash"></a></div>
## Move a document to Trash

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/trash</code>
</strong>
</p>

**Note**: In API Version 2 `delete` and `trash` behave differently to Version 1.

Move a document to Trash.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>409</td> <td><p>Pending documents can not be trashed or deleted.</p>
</td> </tr>
</table>



<div><a id="apiv2documentstrash"></a></div>
## Move one or more documents to Trash

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/trash</code>
</strong>
</p>

Move one or more documents to Trash.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_ids</code><br/><em>required</em></p></td><td><div class="description"><p>List of document IDs to trash.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>A JSON object containing the total number of <code>trashed</code> documents, and an array of documents.</p>
</td> </tr>
<tr> <td>409</td> <td><p>Pending documents can not be trashed or deleted.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}delete"></a></div>
## Delete a document

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/delete</code>
</strong>
</p>

**Note**: In API Version 2 `delete` and `trash` behave differently to Version 1.

Delete a document that is in Trash.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>409</td> <td><p>Pending documents can not be trashed or deleted.</p>
</td> </tr>
</table>



<div><a id="apiv2documentsdelete"></a></div>
## Delete one or more documents

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/delete</code>
</strong>
</p>

Delete one or more documents that are in Trash.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_ids</code><br/><em>required</em></p></td><td><div class="description"><p>List of document IDs to delete.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>A JSON object containing the total number of <code>deleted</code> documents, and an array of documents.</p>
</td> </tr>
<tr> <td>409</td> <td><p>Pending documents can not be trashed or deleted.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}forward"></a></div>
## Forward a document

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/forward</code>
</strong>
</p>

Forward a signed document to a third party.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>email</code><br/><em>required</em></p></td><td><div class="description"><p>The email address to forward the document to.</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>no_content</code><br/><em>optional</em></p><p><em>default:</em> <code>true</code></p></td><td><div class="description"><p>When set to true only the signed document will be forwarded, with no
other email content.
Otherwise a template email content is used, with the document attached.</p>
</div></td><td><p>boolean</p></td><td>formData</td></tr>
<tr><td><p><code>no_attachments</code><br/><em>optional</em></p><p><em>default:</em> <code>false</code></p></td><td><div class="description"><p>When set to true, only the main file will be included as email
attachments.
Any attachments not merged with the main file will not be sent.</p>
</div></td><td><p>boolean</p></td><td>formData</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>202</td> <td><p>The call succeeded, an email to the given address has been queued.</p>
</td> </tr>
<tr> <td>409</td> <td><p>The document status should be <code>Closed</code>.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}setautoreminder"></a></div>
## Set an auto-reminder

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/setautoreminder</code>
</strong>
</p>

Set the number of days in which to send an automatic invitation reminder
message to the signatories that have not yet signed by that date.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>days</code><br/><em>optional</em></p></td><td><div class="description"><p>Including this parameter sets the number of days in which to send
automatic reminders.</p>
<p>Excluding it will remove automatic reminders from the document.</p>
</div></td><td><p>integer<br><em>int32</em></p></td><td>formData</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>400</td> <td><p>The <code>days</code> parameter must a number between 1 and the number of days left
before the document expires.</p>
</td> </tr>
<tr> <td>409</td> <td><p>The document status should be <code>Pending</code>.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}restart"></a></div>
## Restart a document

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/restart</code>
</strong>
</p>

Restart a document that has been cancelled, timed out, or rejected.

*OAuth Privileges required: `DOC_CREATE`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>201</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>409</td> <td><p>Documents that are in Preparation, Pending, or Closed can not be
restarted.</p>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}{signatory_id}setauthenticationtoview"></a></div>
## Set the signatory authentication-to-view method

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/{signatory_id}/setauthenticationtoview</code>
</strong>
</p>

Set the signatory authentication-to-view method after the document has been
started.

*Side effects of this operation may include adding or modifying fields for the signatory.*

For example, if the signatory does not have a field for personal number,
then setting the authentication method to Swedish BankID will necessitate
adding the field to the signatory with a valid personal number.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>signatory_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a signatory.
This value can change before document is made ready for signing, and should
not be used to identify signatories while document is a draft.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>authentication_type</code><br/><em>required</em></p></td><td><div class="description"><p>The type of authentication-to-view method to set for the signatory.</p>
</div><div class="enumeration"><strong>Enum:</strong> <code>standard</code>, <code>se_bankid</code>, <code>no_bankid</code>, <code>dk_nemid</code>, <code>fi_tupas</code>, <code>verimi</code></div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>personal_number</code><br/><em>optional</em></p></td><td><div class="description"><p>If the <code>authentication_type</code> requires a personal number, and the
signatory doesn’t have one set already, then it must be provided and
valid for the chosen authentication-to-view method.</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>mobile_number</code><br/><em>optional</em></p></td><td><div class="description"><p>Can be used for <code>authentication_type</code> that makes use of a mobile
number.
Similar requirements as <code>personal_number</code>.</p>
<p>Currently only Norwegian BankID uses this and therefore must be a valid
Norwegian mobile number.</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>409</td> <td><p>Possible error responses:</p>
<ul>
<li><code>document_state_error</code>: The document status should be 'Pending'.</li>
<li><code>signatory_state_error</code>: The signatory has already authenticated to view.</li>
<li><code>signatory_state_error</code>: The signatory has already signed.</li>
<li><code>signatory_state_error</code>: You can’t mix different e-legitimation
providers (one for viewing and another for signing) for the same
signatory.</li>
</ul>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}{signatory_id}setauthenticationtosign"></a></div>
## Set the signatory authentication-to-sign method

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/{signatory_id}/setauthenticationtosign</code>
</strong>
</p>

Set the signatory authentication-to-sign method after the document has been
started.

*Side effects of this operation may include adding or modifying fields for the signatory.*

For example, if the signatory does not have a field for mobile number, then
setting the authentication method to SMS PIN will necessitate adding a
mobile number field to the signatory and setting it as obligatory.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>signatory_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a signatory.
This value can change before document is made ready for signing, and should
not be used to identify signatories while document is a draft.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>authentication_type</code><br/><em>required</em></p></td><td><div class="description"><p>The type of authentication-to-sign method to set for the signatory.</p>
</div><div class="enumeration"><strong>Enum:</strong> <code>standard</code>, <code>sms_pin</code>, <code>se_bankid</code>, <code>no_bankid</code>, <code>dk_nemid</code>, <code>fi_tupas</code>, <code>onfido_document_check</code>, <code>onfido_document_and_photo_check</code></div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>personal_number</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, it must be valid for the chosen authentication-to-sign
method.</p>
<p>If it is not used by the chosen authentication-to-sign method, the
parameter will be ignored and will have no effect.</p>
<p>If not provided, any existing <code>personal_number</code> field value set for the
signatory will not be changed.
However, if a <code>personal_number</code> <em>SignatoryField</em> does not yet exist,
one will be added to the signatory (with empty string as <code>value</code>).</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>mobile_number</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, it must be valid for the chosen authentication-to-sign
method.</p>
<p>If it is not used by the chosen authentication-to-sign method, the
parameter will be ignored and will have no effect.</p>
<p>If not provided, any existing <code>mobile</code> field value set for the
signatory will not be changed.
However, if a <code>mobile</code> <em>SignatoryField</em> does not yet exist, one will be
added to the signatory (with empty string as <code>value</code>).</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>409</td> <td><p>Possible error responses:</p>
<ul>
<li><code>document_state_error</code>: The document status should be 'Pending'.</li>
<li><code>signatory_state_error</code>: The signatory has already signed.</li>
<li><code>signatory_state_error</code>: You can’t mix different e-legitimation
providers (one for viewing and another for signing) for the same
signatory.</li>
</ul>
</td> </tr>
</table>



<div><a id="apiv2documents{document_id}{signatory_id}changeemailandmobile"></a></div>
## Change the email and mobile number of a signatory

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/{document_id}/{signatory_id}/changeemailandmobile</code>
</strong>
</p>

Change the email address and mobile number of a signatory after the
document has been started.

**This API call is _meant_ to be used for correcting mistakes that may occur
during a manual document preparation process.**

If you are planning to use it programatically, please be aware that this
will result in extra invitation messages being sent, the old invitation
links being invalidated, and may therefore not be the approach best suited
to your use-case.

You will only be able to change values for fields that a signatory has.
For example, if they have no mobile field set, you will not be able to
change it.

*OAuth Privileges required: `DOC_SEND`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a document.
Will not change.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>signatory_id</code><br/><em>required</em></p></td><td><div class="description"><p>Unique identifier for a signatory.
This value can change before document is made ready for signing, and should
not be used to identify signatories while document is a draft.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>email</code><br/><em>optional</em></p></td><td><div class="description"><p>The new email address for the signatory.</p>
<p>Whilst this field is optional, both <code>email</code> and <code>mobile_number</code> cannot
be blank, you need at least one.</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>mobile_number</code><br/><em>optional</em></p></td><td><div class="description"><p>The new mobile number for the signatory.</p>
<p>Whilst this field is optional, both <code>email</code> and <code>mobile_number</code> cannot
be blank, you need at least one.</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>object_version</code><br/><em>optional</em></p></td><td><div class="description"><p>If provided, will check the document <code>object_version</code> and only perform the
operation if these match.
Otherwise you will get a <code>HTTP 409</code>.</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The document metadata as a JSON.</p>
</td> </tr>
<tr> <td>409</td> <td><p>Possible error responses:</p>
<ul>
<li><code>document_state_error</code>: The document status should be 'Pending'.</li>
<li><code>signatory_state_error</code>: The signatory has already signed, is the
author, or does not have a mobile or email field already.</li>
<li><code>request_parameter_parse_error</code>: Can happen if the <code>email</code> or
<code>mobile_number</code> is not in the correct format.</li>
<li><code>request_parameter_missing</code>: If neither <code>email</code> nor <code>mobile_number</code>
is provided.</li>
</ul>
</td> </tr>
</table>



<div><a id="apiv2documentstemplatessetsharing"></a></div>
## Share or unshare templates

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/documents/templates/setsharing</code>
</strong>
</p>

Share or unshare the specified templates with the company's other users.

*OAuth Privileges required: `DOC_CREATE`*

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>document_ids</code><br/><em>required</em></p></td><td><div class="description"><p>List of document IDs of templates to share or unshare.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
<tr><td><p><code>shared</code><br/><em>required</em></p></td><td><div class="description"><p><code>true</code> to share, <code>false</code> to unshare.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>202</td> <td><p>The change has succeeded. The body is empty.</p>
</td> </tr>
</table>


# Attachment

<div><a id="apiv2attachmentslist"></a></div>
## List

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/attachments/list</code>
</strong>
</p>

Fetch a list of attachments, with filtering and sorting options.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>domain</code><br/><em>optional</em></p></td><td><div class="description"><p><strong>Domain in which to search.</strong></p>
<p>The list always contains the attachments of the user. If <code>domain</code> is set
to <code>All</code>, it will also return the attachments shared within the company.</p>
</div></td><td><p>string<br><em>string</em></p></td><td>query</td></tr>
<tr><td><p><code>filter</code><br/><em>optional</em></p><p><em>default:</em> <code>[]</code></p></td><td><div class="description"><p><strong>List of filtering options.</strong></p>
<p>You can supply a list of filtering options to apply.
Only attachments that match <strong>all</strong> filters will be returned.
Therefore, it is easy to apply a set of filters that will return no
documents.</p>
<p>If not supplied, the default is not to apply any filter, i.e. <code>[]</code>.</p>
<p>Must be of type <a href="#attachment-list-filter">Attachment List Filter</a>, for
example:</p>
<p><code>[ { &quot;filter_by&quot;:&quot;text&quot;, &quot;text&quot;:&quot;some keywords&quot;] } ]</code></p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>query</td></tr>
<tr><td><p><code>sorting</code><br/><em>optional</em></p><p><em>default:</em> <code>[ { "sort_by":"time", "order":"descending" } ]</code></p></td><td><div class="description"><p><strong>List of sorting options.</strong></p>
<p>You can supply a list of sorting options, which will be applied to the
list of attachments in the order you provided.</p>
<p>If not supplied, the default is
<code>[ { &quot;sort_by&quot;:&quot;time&quot;, &quot;order&quot;:&quot;descending&quot; } ]</code>,
<em>i.e.</em>, sort by modification time, newest first.</p>
<p>Must be of type <a href="#list-sorting">List Sorting</a>.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>query</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>A JSON object containing an array of attachments.</p>
</td> </tr>
</table>



<div><a id="apiv2attachments{attachment_id}download{filename}"></a></div>
## Download

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/attachments/{attachment_id}/download/{filename}</code>
</strong>
</p>

**Get the attachment's PDF file.**

The optional `filename` parameter in the URL can be set to any valid file
name. This allows you to download the file with user-specified file name in
the browser.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>attachment_id</code><br/><em>required</em></p></td><td><div class="description"><p>Identifier for the attachment.</p>
</div></td><td><p>integer<br><em>int64</em></p></td><td>path</td></tr>
<tr><td><p><code>filename</code><br/><em>optional</em></p></td><td><div class="description"><p>Optional filename parameter.</p>
</div></td><td><p>string</p></td><td>path</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The attachment's PDF file.</p>
</td> </tr>
</table>



<div><a id="apiv2attachmentsnew"></a></div>
## Create

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/attachments/new</code>
</strong>
</p>

Create a new attachment.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>title</code><br/><em>optional</em></p></td><td><div class="description"><p>Title of the attachment. If not present, the title will be taken from
the file name.</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>file</code><br/><em>required</em></p></td><td><div class="description"><p>The PDF to use for the attachment.</p>
</div></td><td><p>file<br><em>application/pdf</em></p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>201</td> <td><p>The attachment has been added. The body is empty.</p>
</td> </tr>
</table>



<div><a id="apiv2attachmentsdelete"></a></div>
## Delete

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/attachments/delete</code>
</strong>
</p>

Delete the specified attachments.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>attachment_ids</code><br/><em>required</em></p></td><td><div class="description"><p>List of attachment IDs of attachments to delete.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The change has succeeded. The body is empty.</p>
</td> </tr>
</table>



<div><a id="apiv2attachmentssetsharing"></a></div>
## Share or unshare

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/attachments/setsharing</code>
</strong>
</p>

Share or unshare the specified attachments with the company's other users.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>attachment_ids</code><br/><em>required</em></p></td><td><div class="description"><p>List of attachment IDs of attachments to share or unshare.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
<tr><td><p><code>shared</code><br/><em>required</em></p></td><td><div class="description"><p><code>true</code> to share, <code>false</code> to unshare.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>202</td> <td><p>The change has succeeded. The body is empty.</p>
</td> </tr>
</table>


# User

<div><a id="apiv2loginandgetsession"></a></div>
## Login and get session

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/loginandgetsession</code>
</strong>
</p>

Login as a user by using their OAuth tokens.

The tokens have to be acquired using `getpersonaltoken` endpoint, see
[Personal Access Credentials](#personal-access-credentials).

Using this endpoint, you can create a link which redirects the user
directly to any page on the Scrive eSign system without going through the
login page.

This can be used to create a better user experience for your integration.

The call returns a _session id_, which can be used to create a link
such as:
`https://scrive.com/loginwithredirect?session_id=SESSION_ID&url=PATH_INSIDE_SCRIVE_COM`.

This link will redirect the user to `PATH_INSIDE_SCRIVE_COM`.
Remember that all URL query parameters must be URL encoded!

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>personal_token</code><br/><em>required</em></p></td><td><div class="description"><p>Must be of type <a href="#oauthauthorization"><code>OAuthAuthorization</code></a></p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON response, for example:
<code>{ &quot;session_id&quot; : &quot;12345-a2510867954321d0&quot; }</code></p>
<p>The string format may change at any time, please treat it as an opaque
string.</p>
</td> </tr>
</table>



<div><a id="apiv2gettokenforpersonalcredentials{user_id}"></a></div>
## Get temporary login_token for a user

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/gettokenforpersonalcredentials/{user_id}</code>
</strong>
</p>

Generate a temporary `login_token` which can be used with `getpersonaltoken`
to get valid OAuth credentials for that user. The endpoint also returns a
base64-encoded PNG image of a QR code. This QR code also contains the
`login_token` embedded in a simple JSON structure. The only purpose of the
JSON is to allow the potential for versioning in future.

This feature is generally for use with Scrive mobile applications and will
be supported in an upcoming relase.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>minutes</code><br/><em>optional</em></p><p><em>default:</em> <code>5</code></p></td><td><div class="description"><p>How many minutes the <code>login_token</code> should be valid for (maximum of 30).</p>
</div></td><td><p>integer</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>Returns a JSON containing <code>login_token</code>, <code>qr_code</code> and <code>expiration_time</code>.</p>
</td> </tr>
</table>



<div><a id="apiv22fasetup"></a></div>
## Setup 2FA

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/2fa/setup</code>
</strong>
</p>

If already activated, returns true,
else triggers QR code generation


### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>A JSON with the <code>twofactor_active</code> flag and (if not activated yet) a <code>qr_code</code>. If present, the field <code>qr_code</code> contains a base64-encoded image of the QR code.</p>
</td> </tr>
</table>



<div><a id="apiv22faconfirm"></a></div>
## Confirm 2FA

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/2fa/confirm</code>
</strong>
</p>

Activates 2-factor-authentication if 2-factor code from QR code is valid

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>totp</code><br/><em>required</em></p></td><td><div class="description"><p>2-factor code</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>A JSON with the <code>twofactor_active</code> flag and <code>totp_valid</code> flag</p>
</td> </tr>
<tr> <td>400</td> <td><p>2-factor code from QR code is invalid</p>
</td> </tr>
</table>



<div><a id="apiv22fadisable"></a></div>
## Disable 2FA

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/2fa/disable</code>
</strong>
</p>

Disables 2-factor-authentication


### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>A JSON with the <code>twofactor_active</code> flag</p>
</td> </tr>
</table>



<div><a id="apiv2isuserdeletable"></a></div>
## Is user deletable?

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/isuserdeletable</code>
</strong>
</p>

Returns an object with boolean flag


### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>A JSON with the <code>deletable</code> flag and (if not deletable) a <code>reason</code></p>
</td> </tr>
</table>



<div><a id="apiv2deleteuser"></a></div>
## Delete user

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/deleteuser</code>
</strong>
</p>

undefined
### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>email</code><br/><em>required</em></p></td><td><div class="description"><p>User's email</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The user was deleted succesfully. The body is empty</p>
</td> </tr>
<tr> <td>400</td> <td><p>Email parameter isn't provided or doesn't match the user's email</p>
</td> </tr>
</table>



<div><a id="apiv2dataretentionpolicy"></a></div>
## Get data retention policies

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/dataretentionpolicy</code>
</strong>
</p>

Returns an object with user and company data detention policies


### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>An object with data retention policies properties.</p>
</td> </tr>
</table>



<div><a id="apiv2dataretentionpolicyset"></a></div>
## Set data retention policies

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/dataretentionpolicy/set</code>
</strong>
</p>

Returns an object with user and company data detention policies

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>data_retention_policy</code><br/><em>required</em></p></td><td><div class="description"><p>Must be of type <a href="#dataretentionpolicy"><code>DataRetentionPolicy</code></a></p>
</div></td><td><p>object<br><em>application/json</em></p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The data retention policy has been updated. The body is empty.</p>
</td> </tr>
</table>



<div><a id="apiv2usertags"></a></div>
## Get tags

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usertags</code>
</strong>
</p>

Returns tags attached to the user


### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p><strong>User defined set of name/value pairs.</strong></p>
<p>Each tag must have <code>{&quot;name&quot;: &quot;some-name&quot;, &quot;value&quot;: &quot;some-value&quot;}</code> format.
In the responses value is always a string.
In the requests you can also provide <code>null</code> value to delete a tag.
Other value types lead to 400 Bad Request response.</p>
</td> </tr>
</table>



<div><a id="apiv2usertagsupdate"></a></div>
## Update tags

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usertags/update</code>
</strong>
</p>

Updates tags attached to the user.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>tags</code><br/><em>required</em></p><p><em>default:</em> <code></code></p></td><td><div class="description"><p>Must be of type <a href="#tags"><code>Tags</code></a></p>
</div></td><td><p>array<br><em>application/json</em></p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>The tags have been updated. The body is empty.</p>
</td> </tr>
</table>



<div><a id="apiv2usagestatsdays"></a></div>
## Get usage stats for days

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usagestats/days</code>
</strong>
</p>

Retrieve usage statistics for the last 30 days

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>withCompany</code><br/><em>optional</em></p></td><td><div class="description"><p>Boolean flag for showing company information in the response.</p>
</div></td><td><p>string</p></td><td>query</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>A JSON object with the statistics on usage:
count of documents on different stages of the process</p>
</td> </tr>
</table>



<div><a id="apiv2usagestatsmonths"></a></div>
## Get usage stats for months

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usagestats/months</code>
</strong>
</p>

Retrieve usage statistics for the last 6 months

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>withCompany</code><br/><em>optional</em></p></td><td><div class="description"><p>Boolean flag for showing company information in the response.</p>
</div></td><td><p>string</p></td><td>query</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>A JSON object with the statistics on usage:
count of documents on different stages of the process</p>
</td> </tr>
</table>



<div><a id="apiv2signup"></a></div>
## Signup Request

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/signup</code>
</strong>
</p>

Create a new user signup request.
Used to handle submission of the signup form.

If there is no user associated with the given email address, then a new
account will be created, and an activation email will be sent to them.

If there already is an account, but the user has not yet accepted the
Scrive eSign _Terms of Service_, then a new activation email will be sent
to them.

If a user account that has accepted the _Terms of Service_ already exists,
no signup request will be created.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>email</code><br/><em>required</em></p></td><td><div class="description"><p>Has to be a valid email address format.</p>
</div></td><td><p>email</p></td><td>formData</td></tr>
<tr><td><p><code>firstName</code><br/><em>optional</em></p></td><td><div class="description"><p>Has to be a valid name string.</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>lastName</code><br/><em>optional</em></p></td><td><div class="description"><p>Has to be a valid name string.</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>phone</code><br/><em>optional</em></p></td><td><div class="description"><p>Has to be a valid phone</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>companyName</code><br/><em>optional</em></p></td><td><div class="description"><p>Has to be a valid company name</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>companyPosition</code><br/><em>optional</em></p></td><td><div class="description"><p>Has to be a valid position</p>
</div></td><td><p>string</p></td><td>formData</td></tr>
<tr><td><p><code>lang</code><br/><em>optional</em></p></td><td><div class="description"><p>Has to be a valid lang code <a href="#language-code"><code>LanguageCode</code></a></p>
</div><div class="enumeration"><strong>Enum:</strong> <code>da</code>, <code>de</code>, <code>el</code>, <code>en</code>, <code>es</code>, <code>et</code>, <code>fi</code>, <code>fr</code>, <code>is</code>, <code>it</code>, <code>lt</code>, <code>lv</code>, <code>nl</code>, <code>no</code>, <code>pt</code>, <code>sv</code></div></td><td><p>string</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON response, will be one of:</p>
<ul>
<li><code>{ &quot;sent&quot;: true }</code></li>
<li><code>{ &quot;sent&quot;: false }</code></li>
</ul>
</td> </tr>
</table>


# User Group

<div><a id="apiv2usergroupscreate"></a></div>
## Create User Group

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/create</code>
</strong>
</p>

> Example of JSON that could be passed in to create a User Group:

> The JSON is URL-encoded and passed in via the `usergroup` form data field.
> It is not necessary to minify the JSON, but also not prohibited.

```json
{
  "parent_id": "1",
  "name": "New UG that's the child of user group 1"
  "tags": [
    {
      "name": "side",
      "value": "dark"
    }
  ]
}
```

> For examples of the JSON output, see details of "View User Group".

This endpoint allows you to create a new User Group. When creating it, you
have the option to set the User Group's name and to specify which other User
Group it will be a child of.

The JSON input must be passed, URL-encoded, via the `usergroup` form data
field.

You must set a `parent_id` since only internal Scrive admins are permitted
to create root User Groups. In order to create a new child, you must have
the requisite permissions upon the parent.

You can also set `tags`, which are arbitrary name/value pairs.

A full User Group JSON response is returned which displays the state _after_
the create operation has been performed. Performing `/update` and then
using the `GET` endpoint should produce the same output both times.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>usergroup</code><br/><em>required</em></p></td><td><div class="description"><p>JSON object containing the <code>name</code>, <code>parent_id</code>, and <code>tags</code> of the User
Group to be created.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
<tr><td><p><code>include-inheritable</code><br/><em>optional</em></p></td><td><div class="description"><p>Append <code>?include-inheritable</code> to the URL to see a preview of which
values can be inherited from an ancestor User Group.</p>
</div></td><td><p>boolean</p></td><td>query</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of a User Group.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that either no User Group
exists with this ID or that you do not have permission to update it)</p>
</td> </tr>
</table>



<div><a id="apiv2usergroups{user_group_id}"></a></div>
## View User Group

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usergroups/{user_group_id}</code>
</strong>
</p>

> Example of a User Group without inheritable previews:

```json
{
  "id": "5",
  "parent_id": "1",
  "name": "A Child Usergroup",
  "children": [
    {
      "id": "2",
      "name": "Some child user group"
    },
    {
      "id": "3",
      "name": "Yet another child user group"
    }
  ],
  "settings": {
    "inherited_from": null,
    "data_retention_policy": {
      "idle_doc_timeout_preparation": null,
      "idle_doc_timeout_closed": null,
      "idle_doc_timeout_canceled": 42,
      "idle_doc_timeout_timedout": null,
      "idle_doc_timeout_rejected": null,
      "idle_doc_timeout_error": null,
      "immediate_trash": false
    }
  },
  "contact_details": {
    "inherited_from": "1",
    "address": {
      "company_number": "5568166804",
      "company_name": "Scrive",
      "address": "Grev Turegatan 11A",
      "zip": "114 46",
      "city": "Stockholm",
      "country": "Sweden"
    }
  },
  "tags": [
    {
      "name": "founded",
      "value": "1846"
    },
    {
      "name": "status",
      "value": "busy"
    }
  ]
}
```

> Example of a User Group with inheritable previews:

```json
{
  "id": "5",
  "parent_id": "1",
  "name": "A Child Usergroup",
  "children": [
    {
      "id": "2",
      "name": "Some child user group"
    },
    {
      "id": "3",
      "name": "Yet another child user group"
    }
  ],
  "settings": {
    "inherited_from": null,
    "data_retention_policy": {
      "idle_doc_timeout_preparation": null,
      "idle_doc_timeout_closed": null,
      "idle_doc_timeout_canceled": 42,
      "idle_doc_timeout_timedout": null,
      "idle_doc_timeout_rejected": null,
      "idle_doc_timeout_error": null,
      "immediate_trash": false
    },
    "inheritable_preview": {
      "inherited_from": "1",
      "data_retention_policy": {
        "idle_doc_timeout_preparation": null,
        "idle_doc_timeout_closed": null,
        "idle_doc_timeout_canceled": null,
        "idle_doc_timeout_timedout": null,
        "idle_doc_timeout_rejected": 23,
        "idle_doc_timeout_error": null,
        "immediate_trash": true
      }
    }
  },
  "contact_details": {
    "inherited_from": "1",
    "address": {
      "company_number": "5568166804",
      "company_name": "Scrive",
      "address": "Grev Turegatan 11A",
      "zip": "114 46",
      "city": "Stockholm",
      "country": "Sweden"
    },
    "inheritable_preview": {
      "inherited_from": "1",
      "address": {
        "company_number": "5568166804",
        "company_name": "Scrive",
        "address": "Grev Turegatan 11A",
        "zip": "114 46",
        "city": "Stockholm",
        "country": "Sweden"
      }
    }
  },
  "tags": [
    {
      "name": "founded",
      "value": "1846"
    },
    {
      "name": "status",
      "value": "busy"
    }
  ]
}
```

This endpoint is used to get an overview of a given User Group, including
other, related and dependent, objects. At time of writing, those extra
objects are `contact_details` and `settings`.

These dependent objects can be inherited. In this case, their
`inherited_from` field will be non-null. The value in this field is the
ID of the User Group which the value is inherited from.

Inheritance works as follows:

Root User Groups (i.e. those who are not children of other User Groups) may
not inherit since there are no ancestors to inherit from.

A child User Group may inherit or have its own dedicated object. In the case
that a User Group chooses to inherit, for example, the `contact_details`
object, then that User Group will inherit from the closest direct ancestor
with its own `contact_details` object. Since root User Groups cannot
inherit, there will always be an ancestor from which a child can inherit.

If you would like to see what a User Group _would_ inherit then you can
append `?include-inheritable` to the URL when making the call. This will add
extra `inheritable_preview` subtrees to the objects which perform the
inheritance calculation, ignoring whether or not the User Group already
inherits.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>user_group_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the User Group you wish to view</p>
</div></td><td><p>integer</p></td><td>path</td></tr>
<tr><td><p><code>include-inheritable</code><br/><em>optional</em></p></td><td><div class="description"><p>Append <code>?include-inheritable</code> to the URL to see a preview of which
values can be inherited from an ancestor User Group.</p>
</div></td><td><p>boolean</p></td><td>query</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of a User Group.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that either no User Group
exists with this ID or that you do not have permission to view it)</p>
</td> </tr>
</table>



<div><a id="apiv2usergroups{user_group_id}update"></a></div>
## Update User Group

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/{user_group_id}/update</code>
</strong>
</p>

> Example of JSON that could be passed in to update a User Group:

> The JSON is URL-encoded and passed in via the `usergroup` form data field.
> It is not necessary to minify the JSON, but also not prohibited.

```json
{
  "parent_id": "1",
  "name": "UG that's now the child of user group 1"
  "tags": [
    {
      "name": "station",
      "value": "ISS"
    },
    {
      "name": "lifeform",
      "value": null
    }
  ]
}
```

> For examples of the JSON output, see details of "View User Group".

This endpoint allows you to update the User Group's meta data, or to change
its parent ID (i.e. to move this User Group so that it is the child of a
differnt User Group).

The JSON input must be passed, URL-encoded, via the `usergroup` form data
field.

When updating the `parent_id`, the following rules are in force:

+ Only internal Scrive admins can promote a child User Group to a root.
+ A root UserGroup may by subordinated to (i.e. made a child of) another User
Group if you have permissions to modify the new parent and User Group
being moved.
+ A child User Group may be moved to be a child of another User Group as long
as you have permissions to update the group being moved, the new parent and
the old parent.

Tags are updated as follows:

+ Only the provided tags are affected on the server.
+ If the value of a tag is a string, the name/value pair is stored,
  overwriting the previous value associated with that name.
+ If the value of a tag is `null`, the name/value pair is removed.
+ Other value types lead to 400 Bad Request response.

The endpoint supports partial updates. This means that only the fields you
supply in your requests will have their values altered.

A full User Group JSON response is returned which displays the state _after_
the update operation has been performed. Performing `/update` and then
using the `GET` endpoint should produce the same output both times.

**Important Note**: *You cannot move usergroups by updating the `children`
field, it must be done via `parent_id`*.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>user_group_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the User Group you wish to update</p>
</div></td><td><p>integer</p></td><td>path</td></tr>
<tr><td><p><code>usergroup</code><br/><em>required</em></p></td><td><div class="description"><p>JSON object containing the new <code>name</code>, <code>parent_id</code> or <code>tags</code> for the User
Group.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
<tr><td><p><code>include-inheritable</code><br/><em>optional</em></p></td><td><div class="description"><p>Set to <code>true</code> to see a preview of which
values can be inherited from an ancestor User Group.</p>
</div></td><td><p>boolean</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of a User Group.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that either no User Group
exists with this ID or that you do not have permission to update it)</p>
</td> </tr>
</table>



<div><a id="apiv2usergroups{user_group_id}delete"></a></div>
## Delete User Group

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/{user_group_id}/delete</code>
</strong>
</p>

> Example of JSON returned:

```json
{
  "id": "1",
  "resource": "usergroup",
  "action": "deleted"
}
```

This endpoint allows you to delete a User Group.

It's worth noting that you may only delete child User Groups. Root User
Groups can only deleted by internal Scrive admins. We also do not support
recursive deletion. If this is required, it can be implemented client-side
by simply working up the tree, deleting the leaves.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>user_group_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the User Group you wish to update</p>
</div></td><td><p>integer</p></td><td>path</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>Simple JSON showing that a User Group with a given ID has been deleted.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that either no User Group
exists with this ID or that you do not have permission to update it)</p>
</td> </tr>
</table>



<div><a id="apiv2usergroups{user_group_id}contact_details"></a></div>
## View User Group Contact Details

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usergroups/{user_group_id}/contact_details</code>
</strong>
</p>

> Example of a User Group Contact Details without inheritable previews:

```json
{
  "inherited_from": "1",
  "address": {
    "company_number": "5568166804",
    "company_name": "Scrive",
    "address": "Grev Turegatan 11A",
    "zip": "114 46",
    "city": "Stockholm",
    "country": "Sweden"
  }
}
```

> Example of a User Group Contact Details with inheritable previews
> (where the User Group is root and therefore must have its own Contact
> Details object):

```json
{
  "inherited_from": null,
  "address": {
    "company_number": "0987654321",
    "company_name": "Scrive",
    "address": "Other Street",
    "zip": "00-321",
    "city": "Warsaw",
    "country": "PL"
  },
  "inheritable_preview": null
}
```

> Example of a User Group Contact Details with inheritable previews
> (where the User Group is a child with its own Contact Details object):

```json
{
  "inherited_from": null,
  "address": {
    "company_number": "0987654321",
    "company_name": "Scrive",
    "address": "123 Other Street",
    "zip": "00-321",
    "city": "Warsaw",
    "country": "Poland"
  },
  "inheritable_preview": {
    "inherited_from": "1",
    "address": {
      "company_number": "5568166804",
      "company_name": "Scrive",
      "address": "Grev Turegatan 11A",
      "zip": "114 46",
      "city": "Stockholm",
      "country": "Sweden"
    }
  }
}
```

> Example of a User Group Contact Details with inheritable previews
> (where the User Group is a child which inherits, meaning that the
> `inheritable_preview` field is a duplicate):

```json
{
  "inherited_from": "1",
  "address": {
    "company_number": "5568166804",
    "company_name": "Scrive",
    "address": "Grev Turegatan 11A",
    "zip": "114 46",
    "city": "Stockholm",
    "country": "Sweden"
  },
  "inheritable_preview": {
    "inherited_from": "1",
    "address": {
      "company_number": "5568166804",
      "company_name": "Scrive",
      "address": "Grev Turegatan 11A",
      "zip": "114 46",
      "city": "Stockholm",
      "country": "Sweden"
    }
  }
}
```

This endpoint is used to get an overview of a given User Group's
`contact_details` object.

The `contact_details` object can be inherited. In this case, the
`inherited_from` field will be non-null. The value in this field is the ID
of the User Group which the value is inherited from.

Inheritance works as follows:

Root User Groups (i.e. those who are not children of other User Groups) may
not inherit since there are no ancestors to inherit from.

A child User Group may inherit or have its own dedicated object. In the case
that a User Group chooses to inherit the `contact_details` object, then that
User Group will inherit from the closest direct ancestor with its own
`contact_details` object. Since root User Groups cannot inherit, there will
always be an ancestor from which a child can inherit.

If you would like to see what a User Group _would_ inherit then you can
append `?include-inheritable` to the URL when making the call. This will add
extra `inheritable_preview` subtrees to the objects which perform the
inheritance calculation, ignoring whether or not the User Group already
inherits.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>user_group_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the User Group whose <code>contact_details</code> object you wish to view</p>
</div></td><td><p>integer</p></td><td>path</td></tr>
<tr><td><p><code>include-inheritable</code><br/><em>optional</em></p></td><td><div class="description"><p>Append <code>?include-inheritable</code> to the URL to see a preview of which
values can be inherited from an ancestor User Group.</p>
</div></td><td><p>boolean</p></td><td>query</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of a User Group's Contact Details.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that either no User Group
exists with this ID or that you do not have permission to view it)</p>
</td> </tr>
</table>



<div><a id="apiv2usergroups{user_group_id}contact_detailsupdate"></a></div>
## Update User Group Contact Details

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/{user_group_id}/contact_details/update</code>
</strong>
</p>


> Example of JSON that could be passed in to update a User Group's Contact
> Details:

> The JSON is URL-encoded and passed in via the `contact_details` form data
> field. It is not necessary to minify the JSON, but also not prohibited.

```json
{
  "address": {
    "company_number": "0987654321",
    "company_name": "Scrive",
    "address": "123 Other Street",
    "zip": "00-321",
    "city": "Warsaw",
    "country": "Poland"
  }
}
```

> For examples of the JSON output, see
> [View User Group Contact Details](#view-user-group-contact-details).

This endpoint allows you to update the User Group's `contact_details` object.

When updating the `contact_details` object, the following rules are in
force:

Partial updates are permissible (and encouraged). You may only supply the
JSON fields that you wish to actually update.

If you update the contact_details of a User Group which currently inherits,
a new, blank `contact_details` object will be created and your (partial or
full) update applied to it.

The User Group from which the contact_details were previously inherited will
be unaffected by the operation.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>user_group_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the User Group whose <code>contact_details</code> object you wish to update</p>
</div></td><td><p>integer</p></td><td>path</td></tr>
<tr><td><p><code>contact_details</code><br/><em>required</em></p></td><td><div class="description"><p>JSON object containing (partial or full) updates to the contact_details
subtrees (currently only <code>data_retention_policy</code> is exposed by the API).</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
<tr><td><p><code>include-inheritable</code><br/><em>optional</em></p></td><td><div class="description"><p>Set to <code>true</code> to see a preview of which
values can be inherited from an ancestor User Group.</p>
</div></td><td><p>boolean</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of a User Group's Contact Details.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that either no User Group
exists with this ID or that you do not have permission to update it)</p>
</td> </tr>
</table>



<div><a id="apiv2usergroups{user_group_id}contact_detailsdelete"></a></div>
## Delete User Group Contact Details

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/{user_group_id}/contact_details/delete</code>
</strong>
</p>

> For examples of the JSON output, see
> [View User Group Contact Details](#view-user-group-contact-details).

This endpoint is used to delete a given User Group's `contact_details`
object. This will cause the contact_details to be inherited rather than the
User Group having its own dedicated contact_details object.

As such, calling delete on a User Group that already inherits will result
in no operation being performed. Also, attempting to delete the
contact_details object of a root User Group will result in an error.

For more details on inheritance, see [View User Group Contact Details](#view-user-group-contact-details).

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>user_group_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the User Group whose <code>contact_details</code> object you wish to
delete</p>
</div></td><td><p>integer</p></td><td>path</td></tr>
<tr><td><p><code>include-inheritable</code><br/><em>optional</em></p></td><td><div class="description"><p>Set to <code>true</code> to see a preview of which
values can be inherited from an ancestor User Group.</p>
</div></td><td><p>boolean</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of a User Group's Contact Details.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that either no User Group
exists with this ID or that you do not have permission to view it)</p>
</td> </tr>
</table>



<div><a id="apiv2usergroups{user_group_id}settings"></a></div>
## View User Group Settings

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usergroups/{user_group_id}/settings</code>
</strong>
</p>


> Example of a User Group Settings without inheritable previews:

```json
{
  "inherited_from": "1",
  "data_retention_policy": {
    "idle_doc_timeout_preparation": null,
    "idle_doc_timeout_closed": null,
    "idle_doc_timeout_canceled": null,
    "idle_doc_timeout_timedout": null,
    "idle_doc_timeout_rejected": null,
    "idle_doc_timeout_error": null,
    "immediate_trash": false
  }
}
```

> Example of a User Group Settings with inheritable previews (where the User
> Group is root and therefore must have its own Settings object):

```json
{
  "inherited_from": null,
  "data_retention_policy": {
    "idle_doc_timeout_preparation": null,
    "idle_doc_timeout_closed": null,
    "idle_doc_timeout_canceled": null,
    "idle_doc_timeout_timedout": null,
    "idle_doc_timeout_rejected": null,
    "idle_doc_timeout_error": null,
    "immediate_trash": false
  },
  "inheritable_preview": null
}
```

> Example of a User Group Settings with inheritable previews (where the User
> Group is a child with its own Settings object):

```json
{
  "inherited_from": null,
  "data_retention_policy": {
    "idle_doc_timeout_preparation": null,
    "idle_doc_timeout_closed": null,
    "idle_doc_timeout_canceled": null,
    "idle_doc_timeout_timedout": null,
    "idle_doc_timeout_rejected": null,
    "idle_doc_timeout_error": null,
    "immediate_trash": false
  },
  "inheritable_preview": {
    "inherited_from": "1",
    "data_retention_policy": {
      "idle_doc_timeout_preparation": null,
      "idle_doc_timeout_closed": null,
      "idle_doc_timeout_canceled": null,
      "idle_doc_timeout_timedout": null,
      "idle_doc_timeout_rejected": null,
      "idle_doc_timeout_error": null,
      "immediate_trash": false
    }
  }
}
```

> Example of a User Group Settings with inheritable previews (where the User
> Group is a child which inherits, meaning that the  `inheritable_preview`
> field is a duplicate):

```json
{
  "inherited_from": "1",
  "data_retention_policy": {
    "idle_doc_timeout_preparation": null,
    "idle_doc_timeout_closed": null,
    "idle_doc_timeout_canceled": null,
    "idle_doc_timeout_timedout": null,
    "idle_doc_timeout_rejected": null,
    "idle_doc_timeout_error": null,
    "immediate_trash": false
  },
  "inheritable_preview": {
    "inherited_from": "1",
    "data_retention_policy": {
      "idle_doc_timeout_preparation": null,
      "idle_doc_timeout_closed": null,
      "idle_doc_timeout_canceled": null,
      "idle_doc_timeout_timedout": null,
      "idle_doc_timeout_rejected": null,
      "idle_doc_timeout_error": null,
      "immediate_trash": false
    }
  }
}
```

This endpoint is used to get an overview of a given User Group's `settings`
object.

The `settings` object can be inherited. In this case, the `inherited_from`
field will be non-null. The value in this field is the ID of the User Group
which the value is inherited from.

Inheritance works as follows:

Root User Groups (i.e. those who are not children of other User Groups) may
not inherit since there are no ancestors to inherit from.

A child User Group may inherit or have its own dedicated object. In the case
that a User Group chooses to inherit the `settings` object, then that User
Group will inherit from the closest direct ancestor with its own
`settings` object. Since root User Groups cannot inherit, there will
always be an ancestor from which a child can inherit.

If you would like to see what a User Group _would_ inherit then you can
append `?include-inheritable` to the URL when making the call. This will add
extra `inheritable_preview` subtrees to the objects which perform the
inheritance calculation, ignoring whether or not the User Group already
inherits.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>user_group_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the User Group whose <code>settings</code> object you wish to view</p>
</div></td><td><p>integer</p></td><td>path</td></tr>
<tr><td><p><code>include-inheritable</code><br/><em>optional</em></p></td><td><div class="description"><p>Append <code>?include-inheritable</code> to the URL to see a preview of which
values can be inherited from an ancestor User Group.</p>
</div></td><td><p>boolean</p></td><td>query</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of a User Group's Settings.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that either no User Group
exists with this ID or that you do not have permission to view it)</p>
</td> </tr>
</table>



<div><a id="apiv2usergroups{user_group_id}settingsupdate"></a></div>
## Update User Group Settings

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/{user_group_id}/settings/update</code>
</strong>
</p>


> Example of JSON that could be passed in to update a User Group's Settings:

> The JSON is URL-encoded and passed in via the `settings` form data field.
> It is not necessary to minify the JSON, but also not prohibited.

> The example below is an example of a partial update.

```json
{
  "data_retention_policy": {
    "idle_doc_timeout_closed": 123
  }
}
```

> For examples of the JSON output, see 
> [View User Group Settings](#view-user-group-settings).

This endpoint allows you to update the User Group's `settings` object.

When updating the `settings` object, the following rules are in force:

Partial updates are permissible (and encouraged). You may only supply the
JSON fields that you wish to actually update.

If you update the settings of a User Group which currently inherits, the
inherited settings will be cloned, your update applied, and this will then
become the new non-inherited settings object for this User Group.

The User Group from which the contact_details were previously inherited will
be unaffected by the operation.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>user_group_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the User Group whose <code>settings</code> object you wish to update</p>
</div></td><td><p>integer</p></td><td>path</td></tr>
<tr><td><p><code>settings</code><br/><em>required</em></p></td><td><div class="description"><p>JSON object containing (partial or full) updates to the settings
subtrees (currently only <code>data_retention_policy</code> is exposed by the API).</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
<tr><td><p><code>include-inheritable</code><br/><em>optional</em></p></td><td><div class="description"><p>Set to <code>true</code> to see a preview of which
values can be inherited from an ancestor User Group.</p>
</div></td><td><p>boolean</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of a User Group's Settings.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that either no User Group
exists with this ID or that you do not have permission to update it)</p>
</td> </tr>
</table>



<div><a id="apiv2usergroups{user_group_id}settingsdelete"></a></div>
## Delete User Group Settings

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/usergroups/{user_group_id}/settings/delete</code>
</strong>
</p>

> For examples of the JSON output, see
> [View User Group Settings](#view-user-group-settings).

This endpoint is used to delete a given User Group's `settings` object. This
will cause the settings to be inherited rather than the User Group having
its own dedicated settings object.

As such, calling delete on a User Group that already inherits will result
in no operation being performed. Also, attempting to delete the settings
object of a root User Group will result in an error.

For more details on inheritance, see [View User Group Settings](#view-user-group-settings).

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>user_group_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the User Group whose <code>settings</code> object you wish to delete</p>
</div></td><td><p>integer</p></td><td>path</td></tr>
<tr><td><p><code>include-inheritable</code><br/><em>optional</em></p></td><td><div class="description"><p>Set to <code>true</code> to see a preview of which
values can be inherited from an ancestor User Group.</p>
</div></td><td><p>boolean</p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of a User Group's Settings.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that either no User Group
exists with this ID or that you do not have permission to view it)</p>
</td> </tr>
</table>



<div><a id="apiv2usergroups{user_group_id}users"></a></div>
## List Users in User Group

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/usergroups/{user_group_id}/users</code>
</strong>
</p>

> Example of a list of the users in a User Group:

```json
[
  {
    "id": "1",
    "fstname": "Arthur",
    "sndname": "Dent",
    "email": "arthur.dent@scrive.com",
    "twofactor_active": false,
    "twofactor_is_mandatory": false,
    "personalnumber": "197910124242",
    "phone": "+444242424242",
    "companyadmin": true,
    "companyposition": "Hitchhiker",
    "lang": "en"
  }
]
```

This endpoint is used to list Users who are members of that User Group.

Note that this will only display Users that are in that User Group and will
not show the Users who are members of any descendent User Groups.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>user_group_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the User Group whose users you wish to view</p>
</div></td><td><p>integer</p></td><td>path</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>List of Users in the User Group</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that either no User Group
exists with this ID or that you do not have permission to view it)</p>
</td> </tr>
</table>


# Access Control

<div><a id="apiv2getuserroles{user_id}"></a></div>
## View Access Roles for User

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/getuserroles/{user_id}</code>
</strong>
</p>

> Example of a User's Access Roles

```json
[
  {
    "id": "8",
    "is_generated": false,
    "role_type": "user_group_admin",
    "source": {
      "type": "user",
      "id": "2"
    },
    "target": {
      "type": "user_group",
      "id": "11"
    },
    "allowed_actions": {
      "document": [
        "create",
        "delete",
        "read",
        "update"
      ],
      "folder_policy": [
        "create",
        "delete",
        "read",
        "update"
      ],
      "user": [
        "create",
        "delete",
        "read",
        "update"
      ],
      "user_group": [
        "create",
        "delete",
        "read",
        "update"
      ],
      "user_group_policy": [
        "create",
        "delete",
        "read",
        "update"
      ],
      "user_personal_token": [
        "create",
        "delete",
        "read",
        "update"
      ],
      "user_policy": [
        "create",
        "delete",
        "read",
        "update"
      ]
    }
  },
  {
    "id": null,
    "is_generated": true,
    "role_type": "user_admin",
    "source": {
      "type": "user",
      "id": "2"
    },
    "target": {
      "type": "user_group",
      "id": "8"
    },
    "allowed_actions": {
      "user": [
        "create",
        "delete",
        "read",
        "update"
      ],
      "user_group": [
          "read"
      ],
      "user_group_policy": [
        "create",
        "delete",
        "read",
        "update"
      ],
      "user_personal_token": [
        "create",
        "delete",
        "read",
        "update"
      ],
      "user_policy": [
        "create",
        "delete",
        "read",
        "update"
      ]
    }
  }
]
```

This endpoint is used to view the roles which have been granted to a given
user.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>user_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the User whose roles you wish to view</p>
</div></td><td><p>integer</p></td><td>url</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>A JSON array of Access Role objects.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that you don't have Read
permissions upon the User or the User does not exist).</p>
</td> </tr>
</table>



<div><a id="apiv2accesscontrolroles{role_id}"></a></div>
## View Access Role

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/accesscontrol/roles/{role_id}</code>
</strong>
</p>

> Example of an Access Role

```json
{
  "id": "8",
  "is_generated": false,
  "role_type": "user_group_admin",
  "source": {
    "type": "user",
    "id": "2"
  },
  "target": {
    "type": "user_group",
    "id": "11"
  },
  "allowed_actions": {
    "document": [
      "create",
      "delete",
      "read",
      "update"
    ],
    "folder_policy": [
      "create",
      "delete",
      "read",
      "update"
    ],
    "user": [
      "create",
      "delete",
      "read",
      "update"
    ],
    "user_group": [
      "create",
      "delete",
      "read",
      "update"
    ],
    "user_group_policy": [
      "create",
      "delete",
      "read",
      "update"
    ],
    "user_personal_token": [
      "create",
      "delete",
      "read",
      "update"
    ],
    "user_policy": [
      "create",
      "delete",
      "read",
      "update"
    ]
  }
}
```

This endpoint is used to get the details of a given access role. Only
explicitly granted roles can be viewed via this endpoint, since implicit
roles do not have an ID of their own to reference them by.

Implicit roles are those roles which are granted automatically as a result
of, for example, User Group membership. Implicit roles have `is_generated`
set to `true` and `id` set to `null`.

Explicit roles are those which have been, as the name suggests, explicitly
granted. This was also almost done certainly via this API. Explicit roles
have `is_generated` set to `false` and a non-`null` `id`.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>role_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the Access Role you wish to view</p>
</div></td><td><p>integer</p></td><td>url</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of an Access Role.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that you don't have enough
permissions to view details of the role. In practice this means that
you lack Read permissions on either the source or the target that the
role refers to.</p>
</td> </tr>
</table>



<div><a id="apiv2accesscontrolroles{role_id}add"></a></div>
## Grant Access Role

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/accesscontrol/roles/{role_id}/add</code>
</strong>
</p>

> Example of JSON that could be used to grant a new role:

```json
{
  "role_type": "user",
  "source": {
    "type": "user",
    "id": "2"
  },
  "target": {
    "type": "user",
    "id": "4"
  }
}
```

This endpoint allows you to grant a new Access Role.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>role</code><br/><em>required</em></p></td><td><div class="description"><p>JSON object containing details of the role to be granted.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of an Access Role.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that you don't have enough
permissions to grant this role. In practice this means that you lack
Create permissions on the Policy relation for either the source or the
target that the proposed role refers to.</p>
</td> </tr>
</table>



<div><a id="apiv2accesscontrolroles{role_id}delete"></a></div>
## Delete Access Role

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/accesscontrol/roles/{role_id}/delete</code>
</strong>
</p>

The endpoint allows you to delete an explicitly granted access role.

_Explicitly granted_ in this case generally means "role which was created
via the Access Control API" as opposed to an implicit role acquired via, for
example, User Group membership. If it has a non-`null` `id` field then it is
an explicit role and can be deleted.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>role_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the Access Role you wish to view</p>
</div></td><td><p>integer</p></td><td>url</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON object showing that an Access Role with the given ID has been
successfully deleted.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that you don't have Delete
permissions upon the Policy relation of either the source or target of
the role). Either that, or no Access Role exists with this <code>id</code>.</p>
</td> </tr>
</table>


# Folders

<div><a id="apiv2folders{folder_id}"></a></div>
## View Folder

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/folders/{folder_id}</code>
</strong>
</p>

> Example of a Folder

```json
{
  "id": "1",
  "name": "Root folder",
  "home_for_user": null,
  "home_for_user_group": "10",
  "parent_id": null,
  "children": [
    {
      "id": "2",
      "name": "Subfolder of 1",
      "home_for_user": "33",
      "home_for_user_group": null
    }
  ]
}
```

This endpoint is used to get the details of a given folder. Note that the
contents of the folder are not displayed, just the metadata about the
folder.

This metadata currently consists of the folder's ID, name, its parent ID (if any),
IDs of the user and the user group for whom the folder is a home folder
and information about its children. Only the immediate children are
included by default (see the `recursive` parameter).

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>folder_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the Folder you wish to view</p>
</div></td><td><p>string</p></td><td>url</td></tr>
<tr><td><p><code>recursive</code><br/><em>optional</em></p><p><em>default:</em> <code>false</code></p></td><td><div class="description"><p>Set ?recursive=true to include all descendant folders in the metadata
instead of just the immediate children.</p>
</div></td><td><p>boolean</p></td><td>query</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of a Folder.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that you don't have enough
permissions to view this Folder). In practice this means that you lack
Read permissions on the Folder. Uniquely, for this endpoint, it is also
possible to acquire Read permissions by being a signatory or approver
of a document in that folder.</p>
</td> </tr>
</table>



<div><a id="apiv2folderscreate"></a></div>
## Create Folder

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/folders/create</code>
</strong>
</p>

> Example of JSON that could be used create a new Folder:

```json
{
  "name": "new child folder of 1",
  "parent_id": "1"
}
```

This endpoint allows you to create a new Folder. When creating it, you have
the option to set the Folder's name and to specify which other Folder it
will be a child of.

The JSON input must be passed, URL-encoded, via the `folder` form data
field.

You must set a `parent_id` since only internal Scrive admins are permitted
to create root Folders. In order to create a new child, you must have the
requisite permissions upon the parent. `name` will be an empty string if
you do not include it.

A full Folder JSON response is returned which displays the state after the
create operation has been performed. Performing `/update` and then using the
GET endpoint should produce the same output both times.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>folder</code><br/><em>optional</em></p></td><td><div class="description"><p>JSON object containing details of the folder to be created.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of a Folder.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that you don't have enough
permissions to create this Folder. In practice this means that you lack
Create permissions on the parent Folder).</p>
</td> </tr>
</table>



<div><a id="apiv2folders{folder_id}update"></a></div>
## Update Folder

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/folders/{folder_id}/update</code>
</strong>
</p>

> Example of JSON that could be used update a Folder:

```json
{
  "name": "new child folder of 1",
  "parent_id": "1"
}
```

> For examples of the JSON output, see details of "View Folder".

This endpoint allows you to update the Folder's meta data, or to change
its parent ID (i.e. to move this Folder so that it is the child of a
differnt Folder).

The JSON input must be passed, URL-encoded, via the `folder` form data
field.

When updating the `parent_id`, the following rules are in force:

+ Only internal Scrive admins can promote a child Folder to a root.
+ A root Folder may by subordinated to (i.e. made a child of) another
Folder if you have permissions to modify the new parent and Folder
being moved.
+ A child Folder may be moved to be a child of another Folder as long
as you have permissions to update the Folder being moved, the new parent and
the old parent.

The endpoint supports partial updates. This means that only the fields you
supply in your requests will have their values altered. Neither field is
required, providing `{}` as your update JSON is essentially a "no op".

A full Folder JSON response is returned which displays the state _after_
the update operation has been performed. Performing `/update` and then
using the `GET` endpoint should produce the same output both times.

**Important Note**: *You cannot move Folders by updating the `children`
field, it must be done via `parent_id`*.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>folder_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the Folder whose contents you wish to list</p>
</div></td><td><p>string</p></td><td>url</td></tr>
<tr><td><p><code>folder</code><br/><em>optional</em></p></td><td><div class="description"><p>JSON object containing details of the folder to be updated.</p>
</div></td><td><p>string<br><em>application/json</em></p></td><td>formData</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON representation of a Folder.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that you don't have enough
permissions to update this Folder. In practice this means that you lack
Update permissions on the Folder.</p>
</td> </tr>
</table>



<div><a id="apiv2folders{folder_id}delete"></a></div>
## Delete Folder

<p>
<strong>
<code class="operation-method operation-method-POST">POST  /api/v2/folders/{folder_id}/delete</code>
</strong>
</p>


This endpoint allows you to delete a Folder.

It's worth noting that you may only delete child Folders. Root Folders
can only deleted by internal Scrive admins. We also do not support recursive
deletion. If this is required, it can be implemented client-side by simply
working up the tree, deleting the leaves.

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>folder_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the Folder you wish to delete</p>
</div></td><td><p>string</p></td><td>url</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON object showing that a Folder with the given ID has been
successfully deleted.</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that you don't have enough
permissions to create this Folder. In practice this means that you lack
Delete permissions on the Folder).</p>
</td> </tr>
</table>



<div><a id="apiv2folders{folder_id}list"></a></div>
## List Documents in Folder

<p>
<strong>
<code class="operation-method operation-method-GET">GET  /api/v2/folders/{folder_id}/list</code>
</strong>
</p>

> Example of a Folder Listing

```json
{
  "total_matching": 2,
  "documents": [
    <Document JSON (see doc endpoints)>,
    <Document JSON (see doc endpoints)>
  ]
}
```

This endpoint is used to get the details of the documents in a given folder.

Other than the JSON fields shown above, which wrap the output data in a list
and show a little metadata, the document JSON for each item in `"documents"`
is structured the same as it would be for endpoints that display a given
document. _(See the [Document Definition](#document-3) documentation for
details)._

### Parameters
<table class="table-left-col-25">
<tr> <th>Parameter</th> <th>Description</th> <th>Type</th> <th>In</th> </tr>
<tr><td><p><code>folder_id</code><br/><em>required</em></p></td><td><div class="description"><p>The ID of the Folder whose contents you wish to list</p>
</div></td><td><p>string</p></td><td>url</td></tr>
</table>

### Responses
<table>
<tr> <th>Code</th> <th>Description</th> </tr>
<tr> <td>200</td> <td><p>JSON object which states the number of documents in the folder and lists
the JSON respresentations of those documents. (See Documents in
Definitions)</p>
</td> </tr>
<tr> <td>403</td> <td><p>Insufficient Permissions error (this means that you don't have enough
permissions to create this Folder. In practice this means that you lack
Read permissions on the Folder)</p>
</td> </tr>
</table>



# Responses
## Document
The document metadata as a JSON.


### Document
`(object)`

> ### Example JSON: for "Document"

```json
{
  "id": "8222115557375075439",
  "title": "Contract for Magnus",
  "parties": [
    {
      "id": "189255",
      "user_id": "1404",
      "is_author": true,
      "is_signatory": false,
      "signatory_role": "viewer",
      "fields": [
        {
          "type": "name",
          "order": 1,
          "value": "Gregory",
          "is_obligatory": true,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "name",
          "order": 2,
          "value": "Davids",
          "is_obligatory": true,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "email",
          "value": "noreply@scrive.com",
          "is_obligatory": false,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "company",
          "value": "Scrive",
          "is_obligatory": false,
          "should_be_filled_by_sender": false,
          "placements": []
        }
      ],
      "sign_order": 1,
      "sign_time": null,
      "seen_time": null,
      "read_invitation_time": null,
      "rejected_time": null,
      "rejection_reason": null,
      "sign_success_redirect_url": null,
      "reject_redirect_url": null,
      "email_delivery_status": "unknown",
      "mobile_delivery_status": "unknown",
      "has_authenticated_to_view": false,
      "csv": null,
      "delivery_method": "pad",
      "authentication_method_to_view": "standard",
      "authentication_method_to_view_archived": "standard",
      "authentication_method_to_sign": "standard",
      "confirmation_delivery_method": "none",
      "allows_highlighting": false,
      "attachments": [],
      "highlighted_pages": [],
      "api_delivery_url": null
    },
    {
      "id": "189256",
      "user_id": null,
      "is_author": false,
      "is_signatory": true,
      "signatory_role": "signing_party",
      "fields": [
        {
          "type": "name",
          "order": 1,
          "value": "Magnus",
          "is_obligatory": true,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "name",
          "order": 2,
          "value": "Söderholm",
          "is_obligatory": true,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "email",
          "value": "noemail@scrive.com",
          "is_obligatory": false,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "mobile",
          "value": "",
          "is_obligatory": false,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "company",
          "value": "Scrive",
          "is_obligatory": false,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "company_number",
          "value": "",
          "is_obligatory": false,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "signature",
          "name": "Signature 1",
          "signature": "195174",
          "is_obligatory": true,
          "should_be_filled_by_sender": false,
          "placements": [
            {
              "xrel": 0.07894736842105263,
              "yrel": 0.09962825278810408,
              "wrel": 0.2736842105263158,
              "hrel": 0.0758364312267658,
              "fsrel": 0.0168,
              "page": 1,
              "tip": "right",
              "anchors": []
            }
          ]
        }
      ],
      "sign_order": 1,
      "sign_time": "2017-01-13T10:38:49.590815Z",
      "seen_time": "2017-01-13T10:38:33.1783Z",
      "read_invitation_time": null,
      "rejected_time": null,
      "rejection_reason": null,
      "sign_success_redirect_url": null,
      "reject_redirect_url": null,
      "email_delivery_status": "unknown",
      "mobile_delivery_status": "unknown",
      "has_authenticated_to_view": false,
      "csv": null,
      "delivery_method": "pad",
      "authentication_method_to_view": "standard",
      "authentication_method_to_view_archived": "standard",
      "authentication_method_to_sign": "standard",
      "confirmation_delivery_method": "none",
      "allows_highlighting": true,
      "attachments": [],
      "highlighted_pages": [
        {
          "page": 1,
          "file_id": "195173"
        }
      ],
      "api_delivery_url": null
    }
  ],
  "file": {
    "name": "contract.pdf",
    "id": "195124"
  },
  "sealed_file": {
    "name": "contract.pdf",
    "id": "195172"
  },
  "author_attachments": [],
  "ctime": "2017-01-13T10:38:17.916324Z",
  "mtime": "2017-01-13T10:38:49.590815Z",
  "timeout_time": "2017-04-13T22:59:59Z",
  "auto_remind_time": null,
  "status": "closed",
  "days_to_sign": 90,
  "days_to_remind": null,
  "display_options": {
    "show_header": true,
    "show_pdf_download": true,
    "show_reject_option": true,
    "allow_reject_reason": true,
    "show_footer": true,
    "document_is_receipt": false,
    "show_arrow": true
  },
  "invitation_message": "",
  "confirmation_message": "",
  "lang": "en",
  "api_callback_url": null,
  "object_version": 26,
  "access_token": "da675b76d876abda",
  "timezone": "Europe/London",
  "tags": [],
  "is_template": false,
  "is_saved": true,
  "is_shared": false,
  "is_trashed": false,
  "is_deleted": false,
  "viewer": {
    "signatory_id": "189255",
    "role": "signatory"
  }
}
```




<div class="json-schema">

<p>Defines the entire structure of a document to be signed, including the
parties, the processes to follow, etc.
It is a core data structure used throughout the Scrive Document API.</p>


<p>This object has the following properties:</p>

<h4> <code>id</code>  <code>(string, read only)</code> </h4>



<div class="json-schema">

<p><strong>Unique identifier for a document.</strong></p>
<p>Will not change over time, and cannot be changed.</p>


</div>

<h4> <code>title</code>  <code>(string)</code> </h4>



<div class="json-schema">

<p><strong>The title of the document.</strong></p>
<p>Can be modified while a document is in preparation.
The title will be used in messages sent to the document’s parties.</p>


</div>

<h4> <code>parties</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p><strong>List of signing and viewing parties.</strong></p>
<p>Defines their details, how the document is delivered to them, what
authentication method they must use, fields they must fill, fields placed
on the PDF, etc.</p>


<p>All array elements must be of type:</p>

<h5> Signatory <code>(object)</code> </h5>



<div class="json-schema">

<p>A signatory defines the details and process for each signing or non-signing
party to a document.</p>


<p>This object has the following properties:</p>

<h6> <code>id</code>  <code>(string, read only)</code> </h6>



<div class="json-schema">

<p><strong>Unique identifier for a party.</strong></p>
<p>Will not change over time, and cannot be changed.</p>


</div>

<h6> <code>user_id</code>  <code>(string,null, read only)</code> </h6>



<div class="json-schema">

<p>If this party has an account on the Scrive eSign system, it will be set
here.</p>


</div>

<h6> <code>is_author</code>  <code>(boolean, read only)</code> </h6>



<div class="json-schema">

<p>Whether this party is the author of the document.</p>


</div>

<h6> <code>is_signatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Deprecated, please use <code>signatory_role</code> instead.
If true, this party is a signatory to the document, otherwise
they are a viewer or an approver and will not sign the
document. If both <code>is_signatory</code> and <code>signatory_role</code> are
present, <code>is_signatory</code> takes precedence if their values are
inconsistent (this is done for backwards compatibility).</p>


</div>

<h6> <code>signatory_role</code>  <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>Signatory role: viewer, approver, or a signing party. Only signing
parties can sign documents, viewers only have view access, and
approvers can additionally approve or reject.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"viewer"</code></li>
<li><code>"signing_party"</code></li>
<li><code>"approver"</code></li>

</ul>

</div>

<h6> <code>fields</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>The signatory fields represent information requested from, or information
about, the signatory.
There are different types of fields, and the array can contain multiple
instances of the same type.</p>
<p>Currently, Scrive supports the following field types:</p>
<ul>
<li><code>SignatoryFieldName</code>: First and last name of the signatory.</li>
<li><code>SignatoryFieldEmailMobile</code>: Email and mobile of the signatory.</li>
<li><code>SignatoryFieldSignature</code>: A signature box placed on the document, for
the signatory to draw their signature.</li>
<li><code>SignatoryFieldStandard</code>: Company name and number, and personal number
(AKA social security number).</li>
<li><code>SignatoryFieldCheckbox</code>: Checkboxes of varying sizes.</li>
<li><code>SignatoryFieldRadiogroup</code>: Radio buttons of varying sizes.</li>
<li><code>SignatoryFieldCustomText</code>: A text field for any other information
about, or requested, from the signatory.</li>
</ul>
<p>Please read the detailed definition of each field type for more
information.
New field types may be added at any point to extend Scrive eSign features.</p>
<p>Fields can have <code>placements</code>, which define where on the document they
will appear.
Similarly, a single field can have multiple placements on the document.</p>
<p><strong>Note:</strong> Some field types have <em>no effect</em> without at least one placement.</p>


<p>Each element of this array must match <em>at least one</em> of the following schemas:</p>


<h6> SignatoryFieldName <code>(object)</code> </h6>



<div class="json-schema">

<p>A signatory field for the name(s) of the party.</p>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>Used to specify that this is a name field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"name"</code></li>

</ul>

</div>

<h6> <code>order</code>  <code>(integer, enum, required)</code> </h6>



<div class="json-schema">

<p>Whether this is the first name (<em>i.e.</em> given name)
or second name (<em>i.e.</em> last name or surname).</p>
<p>Please ensure that there is exacatly one first name and one second name
field, otherwise the signatory may not be asked for their name on the
signing page.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>1</code></li>
<li><code>2</code></li>

</ul>

</div>

<h6> <code>value</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>


<p>Default: <code>""</code></p>

</div>

<h6> <code>is_obligatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h6> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h6> <code>placements</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>If set, where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h6> SignatoryFieldEmailMobile <code>(object)</code> </h6>



<div class="json-schema">

<p>A signatory field for email addresses and mobile numbers.</p>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>Used to specify what type of field this is.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"email"</code></li>
<li><code>"mobile"</code></li>

</ul>

</div>

<h6> <code>value</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>
<p><strong>For the author</strong>: the value will revert to that set in the account settings.
Trying to set any other value will simply result in this field reverting
back to information set in account settings.</p>


<p>Default: <code>""</code></p>

</div>

<h6> <code>is_obligatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h6> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h6> <code>editable_by_signatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Whether the signatory can edit a pre-filled value for this field.
This is useful when you have signatory details on file, but you want them
to be able to modify their email or mobile if it has changed.</p>
<p><strong>Note:</strong> Setting this to <code>true</code> means a signatory will <em>always</em> be able
to change the value on the signing page.
If you want a signatory to authenticate with SMS PIN, please be aware
that this may affect your desired workflow.</p>


<p>Default: <code>false</code></p>

</div>

<h6> <code>placements</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>If set, where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h6> SignatoryFieldSignature <code>(object)</code> </h6>



<div class="json-schema">

<p>A signatory field for placing signature boxes on the document.</p>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"signature"</code></li>

</ul>

</div>

<h6> <code>name</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>A name for the signature field.</p>
<p>The signatory will not see the name of the signature field, however it
will be used in the Evidence Log as a reference.</p>


</div>

<h6> <code>signature</code>  <code>(read only)</code> </h6>



<div class="json-schema">

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>When the signatory has not yet drawn a signature.</p>


</div>

<h6> <code>(string)</code> </h6>



<div class="json-schema">

<p>The File ID of the signature drawn by the signatory.</p>


</div>

</div>

<h6> <code>is_obligatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h6> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h6> <code>placements</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p><strong>Needs to be set, otherwise the signatory will not be able to draw a signature.</strong></p>
<p>Defines where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h6> SignatoryFieldStandard <code>(object)</code> </h6>



<div class="json-schema">

<p>A signatory field for placing a number of standard text fields on the
document:</p>
<ul>
<li>Company name</li>
<li>Company number</li>
<li>Personal number (AKA social security number)</li>
</ul>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>Used to specify what type of field this is.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"company"</code></li>
<li><code>"company_number"</code></li>
<li><code>"personal_number"</code></li>

</ul>

</div>

<h6> <code>value</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>
<p><strong>For the author</strong>: the value will revert to that set in the account settings.
Trying to set any other value will simply result in this field reverting
back to information set in account settings.</p>


<p>Default: <code>""</code></p>

</div>

<h6> <code>is_obligatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h6> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h6> <code>placements</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>If set, where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h6> SignatoryFieldCheckbox <code>(object)</code> </h6>



<div class="json-schema">

<p>A signatory field for placing checkboxes on the document.</p>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>Used to specify that this is a checkbox field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"checkbox"</code></li>

</ul>

</div>

<h6> <code>name</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>A name for the checkbox.</p>
<p>The signatory will not see the name of the checkbox, however it will be
used in the Evidence Log as a reference.</p>


</div>

<h6> <code>is_checked</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p><code>true</code> when the checkbox is checked, <code>false</code> otherwise.</p>
<p>Setting this to <code>true</code> on a document in preparation has the effect of
pre-checking the checkbox for the signatory.</p>


<p>Default: <code>false</code></p>

</div>

<h6> <code>is_obligatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Whether the signatory is obliged to check this checkbox in order to sign
the document.</p>


<p>Default: <code>true</code></p>

</div>

<h6> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h6> <code>placements</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p><strong>Needs to be set, otherwise there will be no checkbox visible to the signatory.</strong></p>
<p>Defines where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width.</p>
<p>Checkboxes can only be three sizes.
The numbers represent <em>small</em>, <em>medium</em> and <em>large</em> checkboxes.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0.011538</code></li>
<li><code>0.021153</code></li>
<li><code>0.0423076</code></li>

</ul>

</div>

<h6> <code>hrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, not used for checkboxes, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h6> <code>fsrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, not used for checkboxes, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h6> SignatoryFieldRadiogroup <code>(object)</code> </h6>



<div class="json-schema">

<p>A signatory field for placing radio buttons on the document.</p>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>Used to specify that this is a radio button group field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"radiogroup"</code></li>

</ul>

</div>

<h6> <code>name</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>A name for the radiogroup.</p>
<p>The signatory will not see the name of the radiogroup, however it will be
used in the Evidence Log as a reference.</p>


</div>

<h6> <code>values</code>  <code>(array, required)</code> </h6>



<div class="json-schema">

<p>An array of radio button option values.
The signatory will not see the name of the radio button values, however
they will be used in the Evidence Log as a reference.</p>
<p>These <em>must</em> correspond one-to-one with the list of <code>placements</code>: that is
the length of <code>values</code> <em>must</em> equal that of <code>placements</code> and vice-versa,
otherwise an error is returned.</p>
<p><strong>Must be equal in length to <code>placements</code> and have at least 2 items.
Each item must be unique and not an empty string.</strong></p>


<p>All array elements must be of type:</p>

<h6> <code>(string)</code> </h6>



<div class="json-schema">

<p>Empty strings are not allowed.</p>


</div>

</div>

<h6> <code>placements</code>  <code>(array, required)</code> </h6>



<div class="json-schema">

<p>Defines where the individual radio buttons should be placed on the
document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>These <em>must</em> correspond one-to-one with the list of <code>values</code>: that is the
length of <code>placements</code> <em>must</em> equal that of <code>vales</code> and vice-versa,
otherwise an error is returned.</p>
<p><strong>Must be equal in length to <code>values</code> and have at least 2 items.</strong></p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width.</p>
<p>Radio buttons can only be three sizes.
The numbers represent <em>small</em>, <em>medium</em> and <em>large</em> radio buttons.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0.014736</code></li>
<li><code>0.021052</code></li>
<li><code>0.025263</code></li>

</ul>

</div>

<h6> <code>hrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, not used for radio buttons, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h6> <code>fsrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, not used for radio buttons, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>
<p><strong>All radio buttons within the same group must be placed on the same page.</strong></p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h6> SignatoryFieldCustomText <code>(object)</code> </h6>



<div class="json-schema">

<p>A custom signatory field for text values. Can be used for any
text-based information. Must be placed on the document, otherwise
the signatory will not be asked to fill in details. Provides an
optional regular expression-based validation mechanism via the
<code>custom_validation</code> field (see below).</p>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>Used to specify that this is a custom text field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"text"</code></li>

</ul>

</div>

<h6> <code>name</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>A name for the custom field.</p>
<p>The name will be used as a placeholder value on the signing page, it will
also be used in the Evidence Log as a reference.</p>


</div>

<h6> <code>value</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>


<p>Default: <code>""</code></p>

</div>

<h6> <code>is_obligatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h6> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h6> <code>placements</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p><strong>Needs to be set, otherwise the signatory will not be asked or presented with this information.</strong></p>
<p>Defines where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

<h6> <code>custom_validation</code>  </h6>



<div class="json-schema">

<p>The value of this property must match <em>exactly one</em> of the following schemas:</p>


<h6> <code>(null)</code> </h6>



<div class="json-schema">

</div>

<h6> SignatoryFieldCustomValidation <code>(object)</code> </h6>



<div class="json-schema">

<p>Optional. Describes how to validate the input to this field using a
custom regular expression.</p>


<p>This object has the following properties:</p>

<h6> <code>pattern</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>Regular expression pattern for field validation.</p>


</div>

<h6> <code>positive_example</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>Example of an input that matches the pattern.</p>


</div>

<h6> <code>tooltip</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>Tooltip for the input text field.</p>


</div>

</div>

</div>

</div>

</div>

<h6> <code>sign_order</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Default: <code>1</code></p>

</div>

<h6> <code>sign_time</code>  <code>(string,null, read only)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>seen_time</code>  <code>(string,null, read only)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>read_invitation_time</code>  <code>(string,null, read only)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>rejected_time</code>  <code>(string,null, read only)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>rejection_reason</code>  <code>(string,null, read only)</code> </h6>



<div class="json-schema">

<p>Will only have a value if the signatory rejected the document, and will
contain the message from the signatory to explain rejection.
The Document <code>display_options</code> needs to allow the signatory to write a
reject reason (<code>allow_reject_reason</code>).</p>


</div>

<h6> <code>sign_success_redirect_url</code>  <code>(string,null)</code> </h6>



<div class="json-schema">

<p>The URL to redirect this party after they have signed the document.</p>


</div>

<h6> <code>reject_redirect_url</code>  <code>(string,null)</code> </h6>



<div class="json-schema">

<p>The URL to redirect this party if they reject the document.</p>


</div>

<h6> <code>email_delivery_status</code>  <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>The current delivery status.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"unknown"</code></li>
<li><code>"not_delivered"</code></li>
<li><code>"delivered"</code></li>
<li><code>"deferred"</code></li>

</ul>

</div>

<h6> <code>mobile_delivery_status</code>  <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>The current delivery status.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"unknown"</code></li>
<li><code>"not_delivered"</code></li>
<li><code>"delivered"</code></li>
<li><code>"deferred"</code></li>

</ul>

</div>

<h6> <code>csv</code>  <code>(array,null)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>delivery_method</code>  <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>Note that <code>api</code> delivery is referred to as &quot;Link&quot; delivery in the Scrive Web
interface. Furthermore, <code>pad</code> delivery is referred to as &quot;In-person&quot;.</p>


<p>Default: <code>"email"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"email"</code></li>
<li><code>"mobile"</code></li>
<li><code>"email_mobile"</code></li>
<li><code>"pad"</code></li>
<li><code>"api"</code></li>

</ul>

</div>

<h6> <code>authentication_method_to_view</code>  <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>This setting forces signatories to authenticate using the supplied identification method to view the document before signing.</p>


<p>Default: <code>"standard"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"standard"</code></li>
<li><code>"sms_pin"</code></li>
<li><code>"se_bankid"</code></li>
<li><code>"no_bankid"</code></li>
<li><code>"dk_nemid"</code></li>
<li><code>"fi_tupas"</code></li>
<li><code>"verimi"</code></li>
<li><code>"nl_idin"</code></li>

</ul>

</div>

<h6> <code>authentication_method_to_view_archived</code>  <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>This setting forces signatories to authenticate using the supplied identification method to view the document once it has been signed and resides in the e-archive.</p>


<p>Default: <code>"standard"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"standard"</code></li>
<li><code>"sms_pin"</code></li>
<li><code>"se_bankid"</code></li>
<li><code>"no_bankid"</code></li>
<li><code>"dk_nemid"</code></li>
<li><code>"fi_tupas"</code></li>
<li><code>"verimi"</code></li>
<li><code>"nl_idin"</code></li>

</ul>

</div>

<h6> <code>authentication_method_to_sign</code>  <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>Default: <code>"standard"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"standard"</code></li>
<li><code>"sms_pin"</code></li>
<li><code>"se_bankid"</code></li>
<li><code>"no_bankid"</code></li>
<li><code>"dk_nemid"</code></li>
<li><code>"fi_tupas"</code></li>
<li><code>"onfido_document_check"</code></li>
<li><code>"onfido_document_and_photo_check"</code></li>

</ul>

</div>

<h6> <code>confirmation_delivery_method</code>  <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>Options allow delivery of the signed document as</p>
<ul>
<li><code>email</code> an attachment in email or</li>
<li><code>mobile</code> a link in a text message or</li>
<li><code>email_mobile</code> both of the two above or</li>
<li><code>email_link</code> a link in an email or</li>
<li><code>email_link_mobile</code> a link in both an email and a text message or</li>
<li><code>none</code> no delivery at all.</li>
</ul>


<p>Default: <code>"email"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"email"</code></li>
<li><code>"mobile"</code></li>
<li><code>"email_mobile"</code></li>
<li><code>"email_link"</code></li>
<li><code>"email_link_mobile"</code></li>
<li><code>"none"</code></li>

</ul>

</div>

<h6> <code>allows_highlighting</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Whether the signatory can highlight pages of the PDF when viewing the
signing page.</p>
<p>If any highlights are performed, the evidence log states that they were
performed while the signatory was viewing the document.</p>
<p>The intention of this feature is <strong>not</strong> for the signatory to affect a
contract via highlighting, but simply for a point-of-sale situation to
assist contract review.</p>


<p>Default: <code>false</code></p>

</div>

<h6> <code>hide_personal_number</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Whether the personal number should be hidden in the final PDF
verification page and the Evidence Log.</p>
<p>This is to be used when the document will be distributed to a wider
audience, and the personal number of the signatory should not be
available in the final document.</p>
<p><strong>If the signatory has a placed field for their personal number, it will
be included in the final PDF</strong>. So this solution only works when the
field does not have any placements.</p>


<p>Default: <code>false</code></p>

</div>

<h6> <code>highlighted_pages</code>  <code>(array, read only)</code> </h6>



<div class="json-schema">

<p>A list of highlights performed by the signatory.</p>
<p>While a document is pending, highlights may be added, but will not appear
in the document file PDF until after the document is closed.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>page</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>The page number which is highlighted (starts from <code>1</code>).
Each signatory can only have one highlight per page.</p>


</div>

<h6> <code>file_id</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>The <code>file_id</code> for an image of the highlights.</p>
<p>The image dimensions will fit the ratio of the PDF page, and will be
of a fixed colour and transparency.</p>
<p>This will be integrated into the final PDF once the document is
closed.</p>


</div>

</div>

</div>

<h6> <code>attachments</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>An attachment requested from the signing party.
Attachments requested from viewing only parties have no effect.</p>


<p>This object has the following properties:</p>

<h6> <code>name</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>A name for the requested attachment.
Will be visible to the signatory when signing the document.</p>


</div>

<h6> <code>description</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>A description for the requested attachment.
Will be visible to the signatory when signing the document alongside
the attachment name.</p>


</div>

<h6> <code>required</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Whether the signatory must upload this attachment.
If <code>false</code>, the signatory may choose not to upload this attachment
when signing.</p>


<p>Default: <code>true</code></p>

</div>

<h6> <code>file_id</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Will be present if and when the party uploads this attachment.</p>


</div>

<h6> <code>file_name</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Will be present if and when the party uploads this attachment.</p>


</div>

</div>

</div>

<h6> <code>api_delivery_url</code>  <code>(string,null)</code> </h6>



<div class="json-schema">

<p>If the <code>delivery_method</code> is set to <code>api</code>, then this field will hold the
relative URL for the party.</p>
<p>Note that <code>api</code> delivery is referred to as &quot;Link&quot; delivery in the Scrive Web
interface.</p>
<p>This will only be available after the signing process has been started,
and will only be visible when accessing the document as the author.</p>


</div>

<h6> <code>consent_module</code>  </h6>



<div class="json-schema">

<p>The value of this property must match <em>exactly one</em> of the following schemas:</p>


<h6> <code>(null)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>If present, a section will be shown asking the signatory to answer some
questions which must be answered by the signatory with either the positive
or the negative option specified.</p>


<p>This object has the following properties:</p>

<h6> <code>title</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Section title.</p>


</div>

<h6> <code>questions</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>title</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Question text.</p>


</div>

<h6> <code>positive_option</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>negative_option</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>response</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Will be present when the party has answered the question. <code>true</code>
when the signatory selected the positive response and <code>false</code>
when the signatory selected the negative response.</p>


</div>

<h6> <code>detailed_description</code>  <code>(object)</code> </h6>



<div class="json-schema">

<p>Optional additional information to show the signatory.</p>


<p>The <code>detailed_description</code> object has the following properties:</p>

<h6> <code>title</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Title of the section. Will be shown in a button.</p>


</div>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Explanation of the question. New lines are shown as is.</p>


</div>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

<h4> <code>file</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>A file that can be accessed using the
<a href="#get-a-related-file">API call to download related files</a>.</p>


<p>The <code>file</code> object has the following properties:</p>

<h5> <code>id</code>  <code>(string, read only)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>name</code>  <code>(string, read only)</code> </h5>



<div class="json-schema">

</div>

</div>

<h4> <code>sealed_file</code>  </h4>



<div class="json-schema">

<p><strong>The cryptographically sealed file.</strong></p>
<p>Will only exist for documents that have been closed.
This field may be <code>null</code> for a short period of time after a document has
been signed by all parties, while the Scrive eSign system seals the
document.</p>


<p>The value of this property must match <em>exactly one</em> of the following schemas:</p>


<h5> <code>(null)</code> </h5>



<div class="json-schema">

</div>

<h5> File <code>(object)</code> </h5>



<div class="json-schema">

<p>A file that can be accessed using the
<a href="#get-a-related-file">API call to download related files</a>.</p>


<p>This object has the following properties:</p>

<h6> <code>id</code>  <code>(string, read only)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>name</code>  <code>(string, read only)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

<h4> <code>author_attachments</code>  <code>(array, read only)</code> </h4>



<div class="json-schema">

<p><strong>List of author attachments.</strong></p>
<p>Can be updated during document preparation using the &quot;set author
attachments&quot; (<code>/{document_id}/setattachments</code>) API call.</p>


<p>All array elements must be of type:</p>

<h5> <code>(object)</code> </h5>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>name</code>  <code>(string, read only)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>required</code>  <code>(boolean, read only)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>add_to_sealed_file</code>  <code>(boolean, read only)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>file_id</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

<h4> <code>ctime</code>  <code>(string, read only)</code> </h4>



<div class="json-schema">

<p>Time at which the document was created.</p>


</div>

<h4> <code>mtime</code>  <code>(string, read only)</code> </h4>



<div class="json-schema">

<p>Latest time at which the document was modified.</p>


</div>

<h4> <code>timeout_time</code>  <code>(string,null, read only)</code> </h4>



<div class="json-schema">

<p>Time after which the document will timeout if it has not been signed.</p>


</div>

<h4> <code>auto_remind_time</code>  <code>(string,null, read only)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>status</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The current document status.</p>
<p>A document in &quot;preparation&quot; can be changed using the <code>update</code> call and the
main file can also be set or changed.</p>
<p>Once the document signing process has begun, the document will be &quot;pending&quot;.</p>
<p>Once all parties have successfully signed the document is &quot;closed&quot; and cannot
be changed.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"preparation"</code></li>
<li><code>"pending"</code></li>
<li><code>"closed"</code></li>
<li><code>"canceled"</code></li>
<li><code>"timedout"</code></li>
<li><code>"rejected"</code></li>
<li><code>"document_error"</code></li>

</ul>

</div>

<h4> <code>days_to_sign</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Default: <code>90</code></p>

</div>

<h4> <code>days_to_remind</code>  <code>(integer,null)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>display_options</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>The <code>display_options</code> object has the following properties:</p>

<h5> <code>show_header</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Whether to show the Scrive header on the signing page.</p>


</div>

<h5> <code>show_pdf_download</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Whether to show an option to download the PDF on the signing page.</p>


</div>

<h5> <code>show_reject_option</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Whether to allow signatories to reject a document.</p>


</div>

<h5> <code>allow_reject_reason</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Whether to allow signatories to enter a plain text reason for
rejecting a document.</p>


</div>

<h5> <code>show_footer</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Whether to show the Scrive footer on the signing page.</p>


</div>

<h5> <code>document_is_receipt</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Whether the document is a receipt to be printed out, and thus should
not have the verification footer added.</p>
<p><em>Note:</em> This reduces the durability of evidence for a document signed
through Scrive eSign, and should only be used when absolutely
necessary.</p>


</div>

<h5> <code>show_arrow</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Whether to show the auto-scroll arrow on the signing page.</p>


</div>

</div>

<h4> <code>invitation_message</code>  <code>(string)</code> </h4>



<div class="json-schema">

<p>The invitation message to send to all parties at the start of the signing
process when using email invitation.</p>
<p>Default is blank meaning that a default message will be used.</p>


<p>Default: <code>""</code></p>

</div>

<h4> <code>sms_invitation_message</code>  <code>(string)</code> </h4>



<div class="json-schema">

<p>The invitation message to send to all parties at the start of the signing
process when using SMS invitation.</p>
<p>Default is blank meaning that a default message will be used.</p>


<p>Default: <code>""</code></p>

</div>

<h4> <code>confirmation_message</code>  <code>(string)</code> </h4>



<div class="json-schema">

<p>The confirmation message to send to all parties once the document has
been signed.</p>
<p>Default is blank meaning that a default message will be used.</p>


<p>Default: <code>""</code></p>

</div>

<h4> <code>sms_confirmation_message</code>  <code>(string)</code> </h4>



<div class="json-schema">

<p>The confirmation message to send to all parties once the document has
been signed when using SMS confirmation.</p>
<p>Default is blank meaning that a default message will be used.</p>


<p>Default: <code>""</code></p>

</div>

<h4> <code>lang</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>Currently supported language codes</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"da"</code></li>
<li><code>"de"</code></li>
<li><code>"el"</code></li>
<li><code>"en"</code></li>
<li><code>"es"</code></li>
<li><code>"et"</code></li>
<li><code>"fi"</code></li>
<li><code>"fr"</code></li>
<li><code>"is"</code></li>
<li><code>"it"</code></li>
<li><code>"lt"</code></li>
<li><code>"lv"</code></li>
<li><code>"nl"</code></li>
<li><code>"no"</code></li>
<li><code>"pt"</code></li>
<li><code>"sv"</code></li>

</ul>

</div>

<h4> <code>api_callback_url</code>  <code>(string,null)</code> </h4>



<div class="json-schema">

<p>The URL to perform an API callback request.</p>
<p>Please see <a href="#callbacks">Callbacks</a> for details.</p>


</div>

<h4> <code>object_version</code>  <code>(integer, read only)</code> </h4>



<div class="json-schema">

<p>The document object version is auto-incremented by the Scrive eSign
system each time an action is performed on it.</p>
<p>Therefore this can be used as a rudimentary synchronisation mechanism to
ensure you are handling a document that has not changed.</p>
<p>It is not recommended to use this field unless you are building an
application with offline capabilities.</p>


<p>Additional restrictions:</p>

<ul>
</ul>

</div>

<h4> <code>access_token</code>  <code>(string, read only)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>timezone</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>tags</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p><strong>User defined set of names and values.</strong></p>
<p>Can be used to manage categories of documents.
The list API call can filter based on document tags.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h5> <code>(object)</code> </h5>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>name</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>value</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

<h4> <code>is_template</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>is_saved</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

<p>A ‘saved’ document will appear in the E-archive.</p>


</div>

<h4> <code>is_shared</code>  <code>(boolean, read only)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>is_trashed</code>  <code>(boolean, read only)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>is_deleted</code>  <code>(boolean, read only)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>viewer</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>The <code>viewer</code> object has the following properties:</p>

<h5> <code>role</code>  <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"company_shared"</code></li>
<li><code>"company_admin"</code></li>
<li><code>"signatory"</code></li>

</ul>

</div>

<h5> <code>signatory_id</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

</div>

</div>

## UserGroup
The user group metadata as a JSON.


### UserGroup
`(object)`

> ### Example JSON: for "UserGroup"

```json
{
  "id": "1",
  "parent_id": null,
  "name": "A Root Usergroup",
  "children": [
    {
      "id": "2",
      "name": "Some child user group"
    },
    {
      "id": "3",
      "name": "Yet another child user group"
    }
  ],
  "settings": {
    "inherited_from": null,
    "data_retention_policy": {
      "idle_doc_timeout_preparation": null,
      "idle_doc_timeout_closed": null,
      "idle_doc_timeout_canceled": 42,
      "idle_doc_timeout_timedout": null,
      "idle_doc_timeout_rejected": null,
      "idle_doc_timeout_error": null,
      "immediate_trash": false
    }
  },
  "contact_details": {
    "inherited_from": null,
    "address": {
      "company_number": "5568166804",
      "company_name": "Scrive",
      "address": "Grev Turegatan 11A",
      "zip": "114 46",
      "city": "Stockholm",
      "country": "Sweden"
    }
  },
  "tags": [
    {
      "name": "alignment",
      "value": "chaotic good"
    }
  ]
}
```




<div class="json-schema">

<p>JSON representation of a User Group.</p>


<p>This object has the following properties:</p>

<h4> <code>id</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>parent_id</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>name</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>children</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h5> <code>(object)</code> </h5>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>id</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>name</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

<h4> <code>settings</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>JSON representation of a User Group's Settings.</p>


<p>The <code>settings</code> object has the following properties:</p>

<h5> <code>inherited_from</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>data_retention_policy</code>  <code>(object)</code> </h5>



<div class="json-schema">

<p>The <code>data_retention_policy</code> object has the following properties:</p>

<h6> <code>idle_doc_timeout_preparation</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after preparation</p>


</div>

<h6> <code>idle_doc_timeout_closed</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after closed</p>


</div>

<h6> <code>idle_doc_timeout_canceled</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after canceled</p>


</div>

<h6> <code>idle_doc_timeout_timedout</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after timedout</p>


</div>

<h6> <code>idle_doc_timeout_rejected</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after rejected</p>


</div>

<h6> <code>idle_doc_timeout_error</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after error</p>


</div>

<h6> <code>immediate_trash</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

<h4> <code>contact_details</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>JSON representation of a User Group's Contact Details.</p>


<p>The <code>contact_details</code> object has the following properties:</p>

<h5> <code>inherited_from</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>address</code>  <code>(object)</code> </h5>



<div class="json-schema">

<p>The <code>address</code> object has the following properties:</p>

<h6> <code>company_number</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>company_name</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>address</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>zip</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>city</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>country</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

<h4> <code>tags</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p><strong>User defined set of name/value pairs.</strong></p>
<p>Each tag must have <code>{&quot;name&quot;: &quot;some-name&quot;, &quot;value&quot;: &quot;some-value&quot;}</code> format.
In the responses value is always a string.
In the requests you can also provide <code>null</code> value to delete a tag.
Other value types lead to 400 Bad Request response.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h5> <code>(object)</code> </h5>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>name</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>value</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

## UserGroupWithInheritable
The user group metadata as a JSON (with Inheritable Previews).


### UserGroupWithInheritable
`(object)`

> ### Example JSON: for "UserGroupWithInheritable"

```json
{
  "id": "5",
  "parent_id": "1",
  "name": "A Child Usergroup",
  "children": [
    {
      "id": "2",
      "name": "Some child user group"
    },
    {
      "id": "3",
      "name": "Yet another child user group"
    }
  ],
  "settings": {
    "inherited_from": null,
    "data_retention_policy": {
      "idle_doc_timeout_preparation": null,
      "idle_doc_timeout_closed": null,
      "idle_doc_timeout_canceled": 42,
      "idle_doc_timeout_timedout": null,
      "idle_doc_timeout_rejected": null,
      "idle_doc_timeout_error": null,
      "immediate_trash": false
    },
    "inheritable_preview": {
      "inherited_from": "1",
      "data_retention_policy": {
        "idle_doc_timeout_preparation": null,
        "idle_doc_timeout_closed": null,
        "idle_doc_timeout_canceled": null,
        "idle_doc_timeout_timedout": null,
        "idle_doc_timeout_rejected": 23,
        "idle_doc_timeout_error": null,
        "immediate_trash": true
      }
    }
  },
  "contact_details": {
    "inherited_from": "1",
    "address": {
      "company_number": "5568166804",
      "company_name": "Scrive",
      "address": "Grev Turegatan 11A",
      "zip": "114 46",
      "city": "Stockholm",
      "country": "Sweden"
    },
    "inheritable_preview": {
      "inherited_from": "1",
      "address": {
        "company_number": "5568166804",
        "company_name": "Scrive",
        "address": "Grev Turegatan 11A",
        "zip": "114 46",
        "city": "Stockholm",
        "country": "Sweden"
      }
    }
  },
  "tags": [
    {
      "name": "home-planet",
      "value": "Earth"
    }
  ]
}
```




<div class="json-schema">

<p>JSON representation of a User Group (with Inheritable Previews).</p>


<p>This object has the following properties:</p>

<h4> <code>id</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>parent_id</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>name</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>children</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h5> <code>(object)</code> </h5>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>id</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>name</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

<h4> <code>settings</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>JSON representation of a User Group's Settings (with Inheritable Preview).</p>


<p>The <code>settings</code> object has the following properties:</p>

<h5> <code>inherited_from</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>data_retention_policy</code>  <code>(object)</code> </h5>



<div class="json-schema">

<p>The <code>data_retention_policy</code> object has the following properties:</p>

<h6> <code>idle_doc_timeout_preparation</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after preparation</p>


</div>

<h6> <code>idle_doc_timeout_closed</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after closed</p>


</div>

<h6> <code>idle_doc_timeout_canceled</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after canceled</p>


</div>

<h6> <code>idle_doc_timeout_timedout</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after timedout</p>


</div>

<h6> <code>idle_doc_timeout_rejected</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after rejected</p>


</div>

<h6> <code>idle_doc_timeout_error</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after error</p>


</div>

<h6> <code>immediate_trash</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

</div>

</div>

<h5> <code>inheritable_preview</code>  <code>(object)</code> </h5>



<div class="json-schema">

<p>The <code>inheritable_preview</code> object has the following properties:</p>

<h6> <code>inherited_from</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>data_retention_policy</code>  <code>(object)</code> </h6>



<div class="json-schema">

<p>The <code>data_retention_policy</code> object has the following properties:</p>

<h6> <code>idle_doc_timeout_preparation</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after preparation</p>


</div>

<h6> <code>idle_doc_timeout_closed</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after closed</p>


</div>

<h6> <code>idle_doc_timeout_canceled</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after canceled</p>


</div>

<h6> <code>idle_doc_timeout_timedout</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after timedout</p>


</div>

<h6> <code>idle_doc_timeout_rejected</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after rejected</p>


</div>

<h6> <code>idle_doc_timeout_error</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after error</p>


</div>

<h6> <code>immediate_trash</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

<h4> <code>contact_details</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>JSON representation of a User Group's Contact Details (with Inheritable
Preview).</p>


<p>The <code>contact_details</code> object has the following properties:</p>

<h5> <code>inherited_from</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>address</code>  <code>(object)</code> </h5>



<div class="json-schema">

<p>The <code>address</code> object has the following properties:</p>

<h6> <code>company_number</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>company_name</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>address</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>zip</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>city</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>country</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

</div>

<h5> <code>inheritable_preview</code>  <code>(object)</code> </h5>



<div class="json-schema">

<p>The <code>inheritable_preview</code> object has the following properties:</p>

<h6> <code>inherited_from</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>address</code>  <code>(object)</code> </h6>



<div class="json-schema">

<p>The <code>address</code> object has the following properties:</p>

<h6> <code>company_number</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>company_name</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>address</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>zip</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>city</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>country</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

<h4> <code>tags</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p><strong>User defined set of name/value pairs.</strong></p>
<p>Each tag must have <code>{&quot;name&quot;: &quot;some-name&quot;, &quot;value&quot;: &quot;some-value&quot;}</code> format.
In the responses value is always a string.
In the requests you can also provide <code>null</code> value to delete a tag.
Other value types lead to 400 Bad Request response.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h5> <code>(object)</code> </h5>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>name</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>value</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

## APIError
The JSON structured errors returned by the API.


### API Error
`(object)`

> ### Example JSON: for "API Error"

```json
{
  "error_type": "request_parameters_parse_error",
  "error_message": "The parameter 'document' could not be parsed. Please refer to our API documentation. Error details: Invalid JSON",
  "http_code": 400
}
```




<div class="json-schema">

<p>The structure of errors returned by the Scrive Document API.</p>


<p>This object has the following properties:</p>

<h4> <code>error_type</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"server_error"</code></li>
<li><code>"request_failed"</code></li>
<li><code>"endpoint_not_found"</code></li>
<li><code>"invalid_authorisation"</code></li>
<li><code>"insufficient_privileges"</code></li>
<li><code>"resource_not_found"</code></li>
<li><code>"document_action_forbidden"</code></li>
<li><code>"request_parameters_missing"</code></li>
<li><code>"request_parameters_parse_error"</code></li>
<li><code>"request_parameters_invalid"</code></li>
<li><code>"document_object_version_mismatch"</code></li>
<li><code>"document_state_error"</code></li>
<li><code>"signatory_state_error"</code></li>
<li><code>"action_not_permitted"</code></li>
<li><code>"conflict_error"</code></li>

</ul>

</div>

<h4> <code>error_message</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>http_code</code>  <code>(integer, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>400</code></li>
<li><code>401</code></li>
<li><code>403</code></li>
<li><code>404</code></li>
<li><code>409</code></li>
<li><code>500</code></li>
<li><code>603</code></li>

</ul>

</div>

</div>


# Definitions

## Document
`(object)`

> ### Example JSON: for "Document"

```json
{
  "id": "8222115557375075439",
  "title": "Contract for Magnus",
  "parties": [
    {
      "id": "189255",
      "user_id": "1404",
      "is_author": true,
      "is_signatory": false,
      "signatory_role": "viewer",
      "fields": [
        {
          "type": "name",
          "order": 1,
          "value": "Gregory",
          "is_obligatory": true,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "name",
          "order": 2,
          "value": "Davids",
          "is_obligatory": true,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "email",
          "value": "noreply@scrive.com",
          "is_obligatory": false,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "company",
          "value": "Scrive",
          "is_obligatory": false,
          "should_be_filled_by_sender": false,
          "placements": []
        }
      ],
      "sign_order": 1,
      "sign_time": null,
      "seen_time": null,
      "read_invitation_time": null,
      "rejected_time": null,
      "rejection_reason": null,
      "sign_success_redirect_url": null,
      "reject_redirect_url": null,
      "email_delivery_status": "unknown",
      "mobile_delivery_status": "unknown",
      "has_authenticated_to_view": false,
      "csv": null,
      "delivery_method": "pad",
      "authentication_method_to_view": "standard",
      "authentication_method_to_view_archived": "standard",
      "authentication_method_to_sign": "standard",
      "confirmation_delivery_method": "none",
      "allows_highlighting": false,
      "attachments": [],
      "highlighted_pages": [],
      "api_delivery_url": null
    },
    {
      "id": "189256",
      "user_id": null,
      "is_author": false,
      "is_signatory": true,
      "signatory_role": "signing_party",
      "fields": [
        {
          "type": "name",
          "order": 1,
          "value": "Magnus",
          "is_obligatory": true,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "name",
          "order": 2,
          "value": "Söderholm",
          "is_obligatory": true,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "email",
          "value": "noemail@scrive.com",
          "is_obligatory": false,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "mobile",
          "value": "",
          "is_obligatory": false,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "company",
          "value": "Scrive",
          "is_obligatory": false,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "company_number",
          "value": "",
          "is_obligatory": false,
          "should_be_filled_by_sender": false,
          "placements": []
        },
        {
          "type": "signature",
          "name": "Signature 1",
          "signature": "195174",
          "is_obligatory": true,
          "should_be_filled_by_sender": false,
          "placements": [
            {
              "xrel": 0.07894736842105263,
              "yrel": 0.09962825278810408,
              "wrel": 0.2736842105263158,
              "hrel": 0.0758364312267658,
              "fsrel": 0.0168,
              "page": 1,
              "tip": "right",
              "anchors": []
            }
          ]
        }
      ],
      "sign_order": 1,
      "sign_time": "2017-01-13T10:38:49.590815Z",
      "seen_time": "2017-01-13T10:38:33.1783Z",
      "read_invitation_time": null,
      "rejected_time": null,
      "rejection_reason": null,
      "sign_success_redirect_url": null,
      "reject_redirect_url": null,
      "email_delivery_status": "unknown",
      "mobile_delivery_status": "unknown",
      "has_authenticated_to_view": false,
      "csv": null,
      "delivery_method": "pad",
      "authentication_method_to_view": "standard",
      "authentication_method_to_view_archived": "standard",
      "authentication_method_to_sign": "standard",
      "confirmation_delivery_method": "none",
      "allows_highlighting": true,
      "attachments": [],
      "highlighted_pages": [
        {
          "page": 1,
          "file_id": "195173"
        }
      ],
      "api_delivery_url": null
    }
  ],
  "file": {
    "name": "contract.pdf",
    "id": "195124"
  },
  "sealed_file": {
    "name": "contract.pdf",
    "id": "195172"
  },
  "author_attachments": [],
  "ctime": "2017-01-13T10:38:17.916324Z",
  "mtime": "2017-01-13T10:38:49.590815Z",
  "timeout_time": "2017-04-13T22:59:59Z",
  "auto_remind_time": null,
  "status": "closed",
  "days_to_sign": 90,
  "days_to_remind": null,
  "display_options": {
    "show_header": true,
    "show_pdf_download": true,
    "show_reject_option": true,
    "allow_reject_reason": true,
    "show_footer": true,
    "document_is_receipt": false,
    "show_arrow": true
  },
  "invitation_message": "",
  "confirmation_message": "",
  "lang": "en",
  "api_callback_url": null,
  "object_version": 26,
  "access_token": "da675b76d876abda",
  "timezone": "Europe/London",
  "tags": [],
  "is_template": false,
  "is_saved": true,
  "is_shared": false,
  "is_trashed": false,
  "is_deleted": false,
  "viewer": {
    "signatory_id": "189255",
    "role": "signatory"
  }
}
```




<div class="json-schema">

<p>Defines the entire structure of a document to be signed, including the
parties, the processes to follow, etc.
It is a core data structure used throughout the Scrive Document API.</p>


<p>This object has the following properties:</p>

<h3> <code>id</code>  <code>(string, read only)</code> </h3>



<div class="json-schema">

<p><strong>Unique identifier for a document.</strong></p>
<p>Will not change over time, and cannot be changed.</p>


</div>

<h3> <code>title</code>  <code>(string)</code> </h3>



<div class="json-schema">

<p><strong>The title of the document.</strong></p>
<p>Can be modified while a document is in preparation.
The title will be used in messages sent to the document’s parties.</p>


</div>

<h3> <code>parties</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p><strong>List of signing and viewing parties.</strong></p>
<p>Defines their details, how the document is delivered to them, what
authentication method they must use, fields they must fill, fields placed
on the PDF, etc.</p>


<p>All array elements must be of type:</p>

<h4> Signatory <code>(object)</code> </h4>



<div class="json-schema">

<p>A signatory defines the details and process for each signing or non-signing
party to a document.</p>


<p>This object has the following properties:</p>

<h5> <code>id</code>  <code>(string, read only)</code> </h5>



<div class="json-schema">

<p><strong>Unique identifier for a party.</strong></p>
<p>Will not change over time, and cannot be changed.</p>


</div>

<h5> <code>user_id</code>  <code>(string,null, read only)</code> </h5>



<div class="json-schema">

<p>If this party has an account on the Scrive eSign system, it will be set
here.</p>


</div>

<h5> <code>is_author</code>  <code>(boolean, read only)</code> </h5>



<div class="json-schema">

<p>Whether this party is the author of the document.</p>


</div>

<h5> <code>is_signatory</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Deprecated, please use <code>signatory_role</code> instead.
If true, this party is a signatory to the document, otherwise
they are a viewer or an approver and will not sign the
document. If both <code>is_signatory</code> and <code>signatory_role</code> are
present, <code>is_signatory</code> takes precedence if their values are
inconsistent (this is done for backwards compatibility).</p>


</div>

<h5> <code>signatory_role</code>  <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>Signatory role: viewer, approver, or a signing party. Only signing
parties can sign documents, viewers only have view access, and
approvers can additionally approve or reject.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"viewer"</code></li>
<li><code>"signing_party"</code></li>
<li><code>"approver"</code></li>

</ul>

</div>

<h5> <code>fields</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>The signatory fields represent information requested from, or information
about, the signatory.
There are different types of fields, and the array can contain multiple
instances of the same type.</p>
<p>Currently, Scrive supports the following field types:</p>
<ul>
<li><code>SignatoryFieldName</code>: First and last name of the signatory.</li>
<li><code>SignatoryFieldEmailMobile</code>: Email and mobile of the signatory.</li>
<li><code>SignatoryFieldSignature</code>: A signature box placed on the document, for
the signatory to draw their signature.</li>
<li><code>SignatoryFieldStandard</code>: Company name and number, and personal number
(AKA social security number).</li>
<li><code>SignatoryFieldCheckbox</code>: Checkboxes of varying sizes.</li>
<li><code>SignatoryFieldRadiogroup</code>: Radio buttons of varying sizes.</li>
<li><code>SignatoryFieldCustomText</code>: A text field for any other information
about, or requested, from the signatory.</li>
</ul>
<p>Please read the detailed definition of each field type for more
information.
New field types may be added at any point to extend Scrive eSign features.</p>
<p>Fields can have <code>placements</code>, which define where on the document they
will appear.
Similarly, a single field can have multiple placements on the document.</p>
<p><strong>Note:</strong> Some field types have <em>no effect</em> without at least one placement.</p>


<p>Each element of this array must match <em>at least one</em> of the following schemas:</p>


<h6> SignatoryFieldName <code>(object)</code> </h6>



<div class="json-schema">

<p>A signatory field for the name(s) of the party.</p>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>Used to specify that this is a name field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"name"</code></li>

</ul>

</div>

<h6> <code>order</code>  <code>(integer, enum, required)</code> </h6>



<div class="json-schema">

<p>Whether this is the first name (<em>i.e.</em> given name)
or second name (<em>i.e.</em> last name or surname).</p>
<p>Please ensure that there is exacatly one first name and one second name
field, otherwise the signatory may not be asked for their name on the
signing page.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>1</code></li>
<li><code>2</code></li>

</ul>

</div>

<h6> <code>value</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>


<p>Default: <code>""</code></p>

</div>

<h6> <code>is_obligatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h6> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h6> <code>placements</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>If set, where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h6> SignatoryFieldEmailMobile <code>(object)</code> </h6>



<div class="json-schema">

<p>A signatory field for email addresses and mobile numbers.</p>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>Used to specify what type of field this is.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"email"</code></li>
<li><code>"mobile"</code></li>

</ul>

</div>

<h6> <code>value</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>
<p><strong>For the author</strong>: the value will revert to that set in the account settings.
Trying to set any other value will simply result in this field reverting
back to information set in account settings.</p>


<p>Default: <code>""</code></p>

</div>

<h6> <code>is_obligatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h6> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h6> <code>editable_by_signatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Whether the signatory can edit a pre-filled value for this field.
This is useful when you have signatory details on file, but you want them
to be able to modify their email or mobile if it has changed.</p>
<p><strong>Note:</strong> Setting this to <code>true</code> means a signatory will <em>always</em> be able
to change the value on the signing page.
If you want a signatory to authenticate with SMS PIN, please be aware
that this may affect your desired workflow.</p>


<p>Default: <code>false</code></p>

</div>

<h6> <code>placements</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>If set, where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h6> SignatoryFieldSignature <code>(object)</code> </h6>



<div class="json-schema">

<p>A signatory field for placing signature boxes on the document.</p>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"signature"</code></li>

</ul>

</div>

<h6> <code>name</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>A name for the signature field.</p>
<p>The signatory will not see the name of the signature field, however it
will be used in the Evidence Log as a reference.</p>


</div>

<h6> <code>signature</code>  <code>(read only)</code> </h6>



<div class="json-schema">

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>When the signatory has not yet drawn a signature.</p>


</div>

<h6> <code>(string)</code> </h6>



<div class="json-schema">

<p>The File ID of the signature drawn by the signatory.</p>


</div>

</div>

<h6> <code>is_obligatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h6> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h6> <code>placements</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p><strong>Needs to be set, otherwise the signatory will not be able to draw a signature.</strong></p>
<p>Defines where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h6> SignatoryFieldStandard <code>(object)</code> </h6>



<div class="json-schema">

<p>A signatory field for placing a number of standard text fields on the
document:</p>
<ul>
<li>Company name</li>
<li>Company number</li>
<li>Personal number (AKA social security number)</li>
</ul>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>Used to specify what type of field this is.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"company"</code></li>
<li><code>"company_number"</code></li>
<li><code>"personal_number"</code></li>

</ul>

</div>

<h6> <code>value</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>
<p><strong>For the author</strong>: the value will revert to that set in the account settings.
Trying to set any other value will simply result in this field reverting
back to information set in account settings.</p>


<p>Default: <code>""</code></p>

</div>

<h6> <code>is_obligatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h6> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h6> <code>placements</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>If set, where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h6> SignatoryFieldCheckbox <code>(object)</code> </h6>



<div class="json-schema">

<p>A signatory field for placing checkboxes on the document.</p>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>Used to specify that this is a checkbox field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"checkbox"</code></li>

</ul>

</div>

<h6> <code>name</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>A name for the checkbox.</p>
<p>The signatory will not see the name of the checkbox, however it will be
used in the Evidence Log as a reference.</p>


</div>

<h6> <code>is_checked</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p><code>true</code> when the checkbox is checked, <code>false</code> otherwise.</p>
<p>Setting this to <code>true</code> on a document in preparation has the effect of
pre-checking the checkbox for the signatory.</p>


<p>Default: <code>false</code></p>

</div>

<h6> <code>is_obligatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Whether the signatory is obliged to check this checkbox in order to sign
the document.</p>


<p>Default: <code>true</code></p>

</div>

<h6> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h6> <code>placements</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p><strong>Needs to be set, otherwise there will be no checkbox visible to the signatory.</strong></p>
<p>Defines where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width.</p>
<p>Checkboxes can only be three sizes.
The numbers represent <em>small</em>, <em>medium</em> and <em>large</em> checkboxes.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0.011538</code></li>
<li><code>0.021153</code></li>
<li><code>0.0423076</code></li>

</ul>

</div>

<h6> <code>hrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, not used for checkboxes, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h6> <code>fsrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, not used for checkboxes, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h6> SignatoryFieldRadiogroup <code>(object)</code> </h6>



<div class="json-schema">

<p>A signatory field for placing radio buttons on the document.</p>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>Used to specify that this is a radio button group field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"radiogroup"</code></li>

</ul>

</div>

<h6> <code>name</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>A name for the radiogroup.</p>
<p>The signatory will not see the name of the radiogroup, however it will be
used in the Evidence Log as a reference.</p>


</div>

<h6> <code>values</code>  <code>(array, required)</code> </h6>



<div class="json-schema">

<p>An array of radio button option values.
The signatory will not see the name of the radio button values, however
they will be used in the Evidence Log as a reference.</p>
<p>These <em>must</em> correspond one-to-one with the list of <code>placements</code>: that is
the length of <code>values</code> <em>must</em> equal that of <code>placements</code> and vice-versa,
otherwise an error is returned.</p>
<p><strong>Must be equal in length to <code>placements</code> and have at least 2 items.
Each item must be unique and not an empty string.</strong></p>


<p>All array elements must be of type:</p>

<h6> <code>(string)</code> </h6>



<div class="json-schema">

<p>Empty strings are not allowed.</p>


</div>

</div>

<h6> <code>placements</code>  <code>(array, required)</code> </h6>



<div class="json-schema">

<p>Defines where the individual radio buttons should be placed on the
document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>These <em>must</em> correspond one-to-one with the list of <code>values</code>: that is the
length of <code>placements</code> <em>must</em> equal that of <code>vales</code> and vice-versa,
otherwise an error is returned.</p>
<p><strong>Must be equal in length to <code>values</code> and have at least 2 items.</strong></p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width.</p>
<p>Radio buttons can only be three sizes.
The numbers represent <em>small</em>, <em>medium</em> and <em>large</em> radio buttons.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0.014736</code></li>
<li><code>0.021052</code></li>
<li><code>0.025263</code></li>

</ul>

</div>

<h6> <code>hrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, not used for radio buttons, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h6> <code>fsrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, not used for radio buttons, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>
<p><strong>All radio buttons within the same group must be placed on the same page.</strong></p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h6> SignatoryFieldCustomText <code>(object)</code> </h6>



<div class="json-schema">

<p>A custom signatory field for text values. Can be used for any
text-based information. Must be placed on the document, otherwise
the signatory will not be asked to fill in details. Provides an
optional regular expression-based validation mechanism via the
<code>custom_validation</code> field (see below).</p>


<p>This object has the following properties:</p>

<h6> <code>type</code>  <code>(string, enum, required)</code> </h6>



<div class="json-schema">

<p>Used to specify that this is a custom text field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"text"</code></li>

</ul>

</div>

<h6> <code>name</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>A name for the custom field.</p>
<p>The name will be used as a placeholder value on the signing page, it will
also be used in the Evidence Log as a reference.</p>


</div>

<h6> <code>value</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>


<p>Default: <code>""</code></p>

</div>

<h6> <code>is_obligatory</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h6> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h6> <code>placements</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p><strong>Needs to be set, otherwise the signatory will not be asked or presented with this information.</strong></p>
<p>Defines where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

<h6> <code>custom_validation</code>  </h6>



<div class="json-schema">

<p>The value of this property must match <em>exactly one</em> of the following schemas:</p>


<h6> <code>(null)</code> </h6>



<div class="json-schema">

</div>

<h6> SignatoryFieldCustomValidation <code>(object)</code> </h6>



<div class="json-schema">

<p>Optional. Describes how to validate the input to this field using a
custom regular expression.</p>


<p>This object has the following properties:</p>

<h6> <code>pattern</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>Regular expression pattern for field validation.</p>


</div>

<h6> <code>positive_example</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>Example of an input that matches the pattern.</p>


</div>

<h6> <code>tooltip</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>Tooltip for the input text field.</p>


</div>

</div>

</div>

</div>

</div>

<h5> <code>sign_order</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Default: <code>1</code></p>

</div>

<h5> <code>sign_time</code>  <code>(string,null, read only)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>seen_time</code>  <code>(string,null, read only)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>read_invitation_time</code>  <code>(string,null, read only)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>rejected_time</code>  <code>(string,null, read only)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>rejection_reason</code>  <code>(string,null, read only)</code> </h5>



<div class="json-schema">

<p>Will only have a value if the signatory rejected the document, and will
contain the message from the signatory to explain rejection.
The Document <code>display_options</code> needs to allow the signatory to write a
reject reason (<code>allow_reject_reason</code>).</p>


</div>

<h5> <code>sign_success_redirect_url</code>  <code>(string,null)</code> </h5>



<div class="json-schema">

<p>The URL to redirect this party after they have signed the document.</p>


</div>

<h5> <code>reject_redirect_url</code>  <code>(string,null)</code> </h5>



<div class="json-schema">

<p>The URL to redirect this party if they reject the document.</p>


</div>

<h5> <code>email_delivery_status</code>  <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>The current delivery status.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"unknown"</code></li>
<li><code>"not_delivered"</code></li>
<li><code>"delivered"</code></li>
<li><code>"deferred"</code></li>

</ul>

</div>

<h5> <code>mobile_delivery_status</code>  <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>The current delivery status.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"unknown"</code></li>
<li><code>"not_delivered"</code></li>
<li><code>"delivered"</code></li>
<li><code>"deferred"</code></li>

</ul>

</div>

<h5> <code>csv</code>  <code>(array,null)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>delivery_method</code>  <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>Note that <code>api</code> delivery is referred to as &quot;Link&quot; delivery in the Scrive Web
interface. Furthermore, <code>pad</code> delivery is referred to as &quot;In-person&quot;.</p>


<p>Default: <code>"email"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"email"</code></li>
<li><code>"mobile"</code></li>
<li><code>"email_mobile"</code></li>
<li><code>"pad"</code></li>
<li><code>"api"</code></li>

</ul>

</div>

<h5> <code>authentication_method_to_view</code>  <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>This setting forces signatories to authenticate using the supplied identification method to view the document before signing.</p>


<p>Default: <code>"standard"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"standard"</code></li>
<li><code>"sms_pin"</code></li>
<li><code>"se_bankid"</code></li>
<li><code>"no_bankid"</code></li>
<li><code>"dk_nemid"</code></li>
<li><code>"fi_tupas"</code></li>
<li><code>"verimi"</code></li>
<li><code>"nl_idin"</code></li>

</ul>

</div>

<h5> <code>authentication_method_to_view_archived</code>  <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>This setting forces signatories to authenticate using the supplied identification method to view the document once it has been signed and resides in the e-archive.</p>


<p>Default: <code>"standard"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"standard"</code></li>
<li><code>"sms_pin"</code></li>
<li><code>"se_bankid"</code></li>
<li><code>"no_bankid"</code></li>
<li><code>"dk_nemid"</code></li>
<li><code>"fi_tupas"</code></li>
<li><code>"verimi"</code></li>
<li><code>"nl_idin"</code></li>

</ul>

</div>

<h5> <code>authentication_method_to_sign</code>  <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>Default: <code>"standard"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"standard"</code></li>
<li><code>"sms_pin"</code></li>
<li><code>"se_bankid"</code></li>
<li><code>"no_bankid"</code></li>
<li><code>"dk_nemid"</code></li>
<li><code>"fi_tupas"</code></li>
<li><code>"onfido_document_check"</code></li>
<li><code>"onfido_document_and_photo_check"</code></li>

</ul>

</div>

<h5> <code>confirmation_delivery_method</code>  <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>Options allow delivery of the signed document as</p>
<ul>
<li><code>email</code> an attachment in email or</li>
<li><code>mobile</code> a link in a text message or</li>
<li><code>email_mobile</code> both of the two above or</li>
<li><code>email_link</code> a link in an email or</li>
<li><code>email_link_mobile</code> a link in both an email and a text message or</li>
<li><code>none</code> no delivery at all.</li>
</ul>


<p>Default: <code>"email"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"email"</code></li>
<li><code>"mobile"</code></li>
<li><code>"email_mobile"</code></li>
<li><code>"email_link"</code></li>
<li><code>"email_link_mobile"</code></li>
<li><code>"none"</code></li>

</ul>

</div>

<h5> <code>allows_highlighting</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Whether the signatory can highlight pages of the PDF when viewing the
signing page.</p>
<p>If any highlights are performed, the evidence log states that they were
performed while the signatory was viewing the document.</p>
<p>The intention of this feature is <strong>not</strong> for the signatory to affect a
contract via highlighting, but simply for a point-of-sale situation to
assist contract review.</p>


<p>Default: <code>false</code></p>

</div>

<h5> <code>hide_personal_number</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Whether the personal number should be hidden in the final PDF
verification page and the Evidence Log.</p>
<p>This is to be used when the document will be distributed to a wider
audience, and the personal number of the signatory should not be
available in the final document.</p>
<p><strong>If the signatory has a placed field for their personal number, it will
be included in the final PDF</strong>. So this solution only works when the
field does not have any placements.</p>


<p>Default: <code>false</code></p>

</div>

<h5> <code>highlighted_pages</code>  <code>(array, read only)</code> </h5>



<div class="json-schema">

<p>A list of highlights performed by the signatory.</p>
<p>While a document is pending, highlights may be added, but will not appear
in the document file PDF until after the document is closed.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>page</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>The page number which is highlighted (starts from <code>1</code>).
Each signatory can only have one highlight per page.</p>


</div>

<h6> <code>file_id</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>The <code>file_id</code> for an image of the highlights.</p>
<p>The image dimensions will fit the ratio of the PDF page, and will be
of a fixed colour and transparency.</p>
<p>This will be integrated into the final PDF once the document is
closed.</p>


</div>

</div>

</div>

<h5> <code>attachments</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>An attachment requested from the signing party.
Attachments requested from viewing only parties have no effect.</p>


<p>This object has the following properties:</p>

<h6> <code>name</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>A name for the requested attachment.
Will be visible to the signatory when signing the document.</p>


</div>

<h6> <code>description</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>A description for the requested attachment.
Will be visible to the signatory when signing the document alongside
the attachment name.</p>


</div>

<h6> <code>required</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Whether the signatory must upload this attachment.
If <code>false</code>, the signatory may choose not to upload this attachment
when signing.</p>


<p>Default: <code>true</code></p>

</div>

<h6> <code>file_id</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Will be present if and when the party uploads this attachment.</p>


</div>

<h6> <code>file_name</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Will be present if and when the party uploads this attachment.</p>


</div>

</div>

</div>

<h5> <code>api_delivery_url</code>  <code>(string,null)</code> </h5>



<div class="json-schema">

<p>If the <code>delivery_method</code> is set to <code>api</code>, then this field will hold the
relative URL for the party.</p>
<p>Note that <code>api</code> delivery is referred to as &quot;Link&quot; delivery in the Scrive Web
interface.</p>
<p>This will only be available after the signing process has been started,
and will only be visible when accessing the document as the author.</p>


</div>

<h5> <code>consent_module</code>  </h5>



<div class="json-schema">

<p>The value of this property must match <em>exactly one</em> of the following schemas:</p>


<h6> <code>(null)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>If present, a section will be shown asking the signatory to answer some
questions which must be answered by the signatory with either the positive
or the negative option specified.</p>


<p>This object has the following properties:</p>

<h6> <code>title</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Section title.</p>


</div>

<h6> <code>questions</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>title</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Question text.</p>


</div>

<h6> <code>positive_option</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>negative_option</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>response</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Will be present when the party has answered the question. <code>true</code>
when the signatory selected the positive response and <code>false</code>
when the signatory selected the negative response.</p>


</div>

<h6> <code>detailed_description</code>  <code>(object)</code> </h6>



<div class="json-schema">

<p>Optional additional information to show the signatory.</p>


<p>The <code>detailed_description</code> object has the following properties:</p>

<h6> <code>title</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Title of the section. Will be shown in a button.</p>


</div>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Explanation of the question. New lines are shown as is.</p>


</div>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

<h3> <code>file</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>A file that can be accessed using the
<a href="#get-a-related-file">API call to download related files</a>.</p>


<p>The <code>file</code> object has the following properties:</p>

<h4> <code>id</code>  <code>(string, read only)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>name</code>  <code>(string, read only)</code> </h4>



<div class="json-schema">

</div>

</div>

<h3> <code>sealed_file</code>  </h3>



<div class="json-schema">

<p><strong>The cryptographically sealed file.</strong></p>
<p>Will only exist for documents that have been closed.
This field may be <code>null</code> for a short period of time after a document has
been signed by all parties, while the Scrive eSign system seals the
document.</p>


<p>The value of this property must match <em>exactly one</em> of the following schemas:</p>


<h4> <code>(null)</code> </h4>



<div class="json-schema">

</div>

<h4> File <code>(object)</code> </h4>



<div class="json-schema">

<p>A file that can be accessed using the
<a href="#get-a-related-file">API call to download related files</a>.</p>


<p>This object has the following properties:</p>

<h5> <code>id</code>  <code>(string, read only)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>name</code>  <code>(string, read only)</code> </h5>



<div class="json-schema">

</div>

</div>

</div>

<h3> <code>author_attachments</code>  <code>(array, read only)</code> </h3>



<div class="json-schema">

<p><strong>List of author attachments.</strong></p>
<p>Can be updated during document preparation using the &quot;set author
attachments&quot; (<code>/{document_id}/setattachments</code>) API call.</p>


<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>name</code>  <code>(string, read only)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>required</code>  <code>(boolean, read only)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>add_to_sealed_file</code>  <code>(boolean, read only)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>file_id</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

</div>

</div>

<h3> <code>ctime</code>  <code>(string, read only)</code> </h3>



<div class="json-schema">

<p>Time at which the document was created.</p>


</div>

<h3> <code>mtime</code>  <code>(string, read only)</code> </h3>



<div class="json-schema">

<p>Latest time at which the document was modified.</p>


</div>

<h3> <code>timeout_time</code>  <code>(string,null, read only)</code> </h3>



<div class="json-schema">

<p>Time after which the document will timeout if it has not been signed.</p>


</div>

<h3> <code>auto_remind_time</code>  <code>(string,null, read only)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>status</code>  <code>(string, enum)</code> </h3>



<div class="json-schema">

<p>The current document status.</p>
<p>A document in &quot;preparation&quot; can be changed using the <code>update</code> call and the
main file can also be set or changed.</p>
<p>Once the document signing process has begun, the document will be &quot;pending&quot;.</p>
<p>Once all parties have successfully signed the document is &quot;closed&quot; and cannot
be changed.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"preparation"</code></li>
<li><code>"pending"</code></li>
<li><code>"closed"</code></li>
<li><code>"canceled"</code></li>
<li><code>"timedout"</code></li>
<li><code>"rejected"</code></li>
<li><code>"document_error"</code></li>

</ul>

</div>

<h3> <code>days_to_sign</code>  <code>(integer)</code> </h3>



<div class="json-schema">

<p>Default: <code>90</code></p>

</div>

<h3> <code>days_to_remind</code>  <code>(integer,null)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>display_options</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>The <code>display_options</code> object has the following properties:</p>

<h4> <code>show_header</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

<p>Whether to show the Scrive header on the signing page.</p>


</div>

<h4> <code>show_pdf_download</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

<p>Whether to show an option to download the PDF on the signing page.</p>


</div>

<h4> <code>show_reject_option</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

<p>Whether to allow signatories to reject a document.</p>


</div>

<h4> <code>allow_reject_reason</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

<p>Whether to allow signatories to enter a plain text reason for
rejecting a document.</p>


</div>

<h4> <code>show_footer</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

<p>Whether to show the Scrive footer on the signing page.</p>


</div>

<h4> <code>document_is_receipt</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

<p>Whether the document is a receipt to be printed out, and thus should
not have the verification footer added.</p>
<p><em>Note:</em> This reduces the durability of evidence for a document signed
through Scrive eSign, and should only be used when absolutely
necessary.</p>


</div>

<h4> <code>show_arrow</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

<p>Whether to show the auto-scroll arrow on the signing page.</p>


</div>

</div>

<h3> <code>invitation_message</code>  <code>(string)</code> </h3>



<div class="json-schema">

<p>The invitation message to send to all parties at the start of the signing
process when using email invitation.</p>
<p>Default is blank meaning that a default message will be used.</p>


<p>Default: <code>""</code></p>

</div>

<h3> <code>sms_invitation_message</code>  <code>(string)</code> </h3>



<div class="json-schema">

<p>The invitation message to send to all parties at the start of the signing
process when using SMS invitation.</p>
<p>Default is blank meaning that a default message will be used.</p>


<p>Default: <code>""</code></p>

</div>

<h3> <code>confirmation_message</code>  <code>(string)</code> </h3>



<div class="json-schema">

<p>The confirmation message to send to all parties once the document has
been signed.</p>
<p>Default is blank meaning that a default message will be used.</p>


<p>Default: <code>""</code></p>

</div>

<h3> <code>sms_confirmation_message</code>  <code>(string)</code> </h3>



<div class="json-schema">

<p>The confirmation message to send to all parties once the document has
been signed when using SMS confirmation.</p>
<p>Default is blank meaning that a default message will be used.</p>


<p>Default: <code>""</code></p>

</div>

<h3> <code>lang</code>  <code>(string, enum)</code> </h3>



<div class="json-schema">

<p>Currently supported language codes</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"da"</code></li>
<li><code>"de"</code></li>
<li><code>"el"</code></li>
<li><code>"en"</code></li>
<li><code>"es"</code></li>
<li><code>"et"</code></li>
<li><code>"fi"</code></li>
<li><code>"fr"</code></li>
<li><code>"is"</code></li>
<li><code>"it"</code></li>
<li><code>"lt"</code></li>
<li><code>"lv"</code></li>
<li><code>"nl"</code></li>
<li><code>"no"</code></li>
<li><code>"pt"</code></li>
<li><code>"sv"</code></li>

</ul>

</div>

<h3> <code>api_callback_url</code>  <code>(string,null)</code> </h3>



<div class="json-schema">

<p>The URL to perform an API callback request.</p>
<p>Please see <a href="#callbacks">Callbacks</a> for details.</p>


</div>

<h3> <code>object_version</code>  <code>(integer, read only)</code> </h3>



<div class="json-schema">

<p>The document object version is auto-incremented by the Scrive eSign
system each time an action is performed on it.</p>
<p>Therefore this can be used as a rudimentary synchronisation mechanism to
ensure you are handling a document that has not changed.</p>
<p>It is not recommended to use this field unless you are building an
application with offline capabilities.</p>


<p>Additional restrictions:</p>

<ul>
</ul>

</div>

<h3> <code>access_token</code>  <code>(string, read only)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>timezone</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>tags</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p><strong>User defined set of names and values.</strong></p>
<p>Can be used to manage categories of documents.
The list API call can filter based on document tags.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>name</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>value</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

</div>

</div>

<h3> <code>is_template</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>is_saved</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>A ‘saved’ document will appear in the E-archive.</p>


</div>

<h3> <code>is_shared</code>  <code>(boolean, read only)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>is_trashed</code>  <code>(boolean, read only)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>is_deleted</code>  <code>(boolean, read only)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>viewer</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>The <code>viewer</code> object has the following properties:</p>

<h4> <code>role</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"company_shared"</code></li>
<li><code>"company_admin"</code></li>
<li><code>"signatory"</code></li>

</ul>

</div>

<h4> <code>signatory_id</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

</div>

</div>

## Document Status
`(string, enum)`


<div class="json-schema">

<p>The current document status.</p>
<p>A document in &quot;preparation&quot; can be changed using the <code>update</code> call and the
main file can also be set or changed.</p>
<p>Once the document signing process has begun, the document will be &quot;pending&quot;.</p>
<p>Once all parties have successfully signed the document is &quot;closed&quot; and cannot
be changed.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"preparation"</code></li>
<li><code>"pending"</code></li>
<li><code>"closed"</code></li>
<li><code>"canceled"</code></li>
<li><code>"timedout"</code></li>
<li><code>"rejected"</code></li>
<li><code>"document_error"</code></li>

</ul>

</div>

## Signatory
`(object)`

> ### Example JSON: for "Signatory"

```json
{
  "id": "189256",
  "user_id": null,
  "is_author": false,
  "is_signatory": true,
  "signatory_role": "signing_party",
  "fields": [
    {
      "type": "name",
      "order": 1,
      "value": "Magnus",
      "is_obligatory": true,
      "should_be_filled_by_sender": false,
      "placements": []
    },
    {
      "type": "name",
      "order": 2,
      "value": "Söderholm",
      "is_obligatory": true,
      "should_be_filled_by_sender": false,
      "placements": []
    },
    {
      "type": "email",
      "value": "noemail@scrive.com",
      "is_obligatory": false,
      "should_be_filled_by_sender": false,
      "editable_by_signatory": false,
      "placements": []
    },
    {
      "type": "mobile",
      "value": "",
      "is_obligatory": false,
      "should_be_filled_by_sender": false,
      "placements": []
    },
    {
      "type": "company",
      "value": "Scrive",
      "is_obligatory": false,
      "should_be_filled_by_sender": false,
      "placements": []
    },
    {
      "type": "company_number",
      "value": "",
      "is_obligatory": false,
      "should_be_filled_by_sender": false,
      "placements": []
    },
    {
      "type": "signature",
      "name": "Signature 1",
      "signature": "195174",
      "is_obligatory": true,
      "should_be_filled_by_sender": false,
      "placements": [
        {
          "xrel": 0.07894736842105263,
          "yrel": 0.09962825278810408,
          "wrel": 0.2736842105263158,
          "hrel": 0.0758364312267658,
          "fsrel": 0.0168,
          "page": 1,
          "tip": "right",
          "anchors": []
        }
      ]
    }
  ],
  "sign_order": 1,
  "sign_time": "2017-01-13T10:38:49.590815Z",
  "seen_time": "2017-01-13T10:38:33.1783Z",
  "read_invitation_time": null,
  "rejected_time": null,
  "rejection_reason": null,
  "sign_success_redirect_url": null,
  "reject_redirect_url": null,
  "email_delivery_status": "unknown",
  "mobile_delivery_status": "unknown",
  "has_authenticated_to_view": false,
  "csv": null,
  "delivery_method": "pad",
  "authentication_method_to_view": "standard",
  "authentication_method_to_view_archived": "standard",
  "authentication_method_to_sign": "standard",
  "confirmation_delivery_method": "none",
  "allows_highlighting": true,
  "hide_personal_number": false,
  "attachments": [],
  "highlighted_pages": [
    {
      "page": 1,
      "file_id": "195173"
    }
  ],
  "api_delivery_url": null,
  "consent_module": {
    "title": "Handling of personal information",
    "questions": [
      {
        "title": "Do you agree for your information to be processed?",
        "positive_option": "Yes, I agree with the processing of my data.",
        "negative_option": "No, I do not agree with any processing of my data.",
        "response": null,
        "detailed_description": {
          "title": "More information",
          "text": "Long extra information regarding the question can go here, and can be separated using newlines.\n\nThis is useful for long terms and conditions that come along with a question."
        }
      }
    ]
  }
}
```




<div class="json-schema">

<p>A signatory defines the details and process for each signing or non-signing
party to a document.</p>


<p>This object has the following properties:</p>

<h3> <code>id</code>  <code>(string, read only)</code> </h3>



<div class="json-schema">

<p><strong>Unique identifier for a party.</strong></p>
<p>Will not change over time, and cannot be changed.</p>


</div>

<h3> <code>user_id</code>  <code>(string,null, read only)</code> </h3>



<div class="json-schema">

<p>If this party has an account on the Scrive eSign system, it will be set
here.</p>


</div>

<h3> <code>is_author</code>  <code>(boolean, read only)</code> </h3>



<div class="json-schema">

<p>Whether this party is the author of the document.</p>


</div>

<h3> <code>is_signatory</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Deprecated, please use <code>signatory_role</code> instead.
If true, this party is a signatory to the document, otherwise
they are a viewer or an approver and will not sign the
document. If both <code>is_signatory</code> and <code>signatory_role</code> are
present, <code>is_signatory</code> takes precedence if their values are
inconsistent (this is done for backwards compatibility).</p>


</div>

<h3> <code>signatory_role</code>  <code>(string, enum)</code> </h3>



<div class="json-schema">

<p>Signatory role: viewer, approver, or a signing party. Only signing
parties can sign documents, viewers only have view access, and
approvers can additionally approve or reject.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"viewer"</code></li>
<li><code>"signing_party"</code></li>
<li><code>"approver"</code></li>

</ul>

</div>

<h3> <code>fields</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p>The signatory fields represent information requested from, or information
about, the signatory.
There are different types of fields, and the array can contain multiple
instances of the same type.</p>
<p>Currently, Scrive supports the following field types:</p>
<ul>
<li><code>SignatoryFieldName</code>: First and last name of the signatory.</li>
<li><code>SignatoryFieldEmailMobile</code>: Email and mobile of the signatory.</li>
<li><code>SignatoryFieldSignature</code>: A signature box placed on the document, for
the signatory to draw their signature.</li>
<li><code>SignatoryFieldStandard</code>: Company name and number, and personal number
(AKA social security number).</li>
<li><code>SignatoryFieldCheckbox</code>: Checkboxes of varying sizes.</li>
<li><code>SignatoryFieldRadiogroup</code>: Radio buttons of varying sizes.</li>
<li><code>SignatoryFieldCustomText</code>: A text field for any other information
about, or requested, from the signatory.</li>
</ul>
<p>Please read the detailed definition of each field type for more
information.
New field types may be added at any point to extend Scrive eSign features.</p>
<p>Fields can have <code>placements</code>, which define where on the document they
will appear.
Similarly, a single field can have multiple placements on the document.</p>
<p><strong>Note:</strong> Some field types have <em>no effect</em> without at least one placement.</p>


<p>Each element of this array must match <em>at least one</em> of the following schemas:</p>


<h4> SignatoryFieldName <code>(object)</code> </h4>



<div class="json-schema">

<p>A signatory field for the name(s) of the party.</p>


<p>This object has the following properties:</p>

<h5> <code>type</code>  <code>(string, enum, required)</code> </h5>



<div class="json-schema">

<p>Used to specify that this is a name field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"name"</code></li>

</ul>

</div>

<h5> <code>order</code>  <code>(integer, enum, required)</code> </h5>



<div class="json-schema">

<p>Whether this is the first name (<em>i.e.</em> given name)
or second name (<em>i.e.</em> last name or surname).</p>
<p>Please ensure that there is exacatly one first name and one second name
field, otherwise the signatory may not be asked for their name on the
signing page.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>1</code></li>
<li><code>2</code></li>

</ul>

</div>

<h5> <code>value</code>  <code>(string)</code> </h5>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>


<p>Default: <code>""</code></p>

</div>

<h5> <code>is_obligatory</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h5> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h5> <code>placements</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>If set, where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h4> SignatoryFieldEmailMobile <code>(object)</code> </h4>



<div class="json-schema">

<p>A signatory field for email addresses and mobile numbers.</p>


<p>This object has the following properties:</p>

<h5> <code>type</code>  <code>(string, enum, required)</code> </h5>



<div class="json-schema">

<p>Used to specify what type of field this is.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"email"</code></li>
<li><code>"mobile"</code></li>

</ul>

</div>

<h5> <code>value</code>  <code>(string)</code> </h5>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>
<p><strong>For the author</strong>: the value will revert to that set in the account settings.
Trying to set any other value will simply result in this field reverting
back to information set in account settings.</p>


<p>Default: <code>""</code></p>

</div>

<h5> <code>is_obligatory</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h5> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h5> <code>editable_by_signatory</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Whether the signatory can edit a pre-filled value for this field.
This is useful when you have signatory details on file, but you want them
to be able to modify their email or mobile if it has changed.</p>
<p><strong>Note:</strong> Setting this to <code>true</code> means a signatory will <em>always</em> be able
to change the value on the signing page.
If you want a signatory to authenticate with SMS PIN, please be aware
that this may affect your desired workflow.</p>


<p>Default: <code>false</code></p>

</div>

<h5> <code>placements</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>If set, where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h4> SignatoryFieldSignature <code>(object)</code> </h4>



<div class="json-schema">

<p>A signatory field for placing signature boxes on the document.</p>


<p>This object has the following properties:</p>

<h5> <code>type</code>  <code>(string, enum, required)</code> </h5>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"signature"</code></li>

</ul>

</div>

<h5> <code>name</code>  <code>(string, required)</code> </h5>



<div class="json-schema">

<p>A name for the signature field.</p>
<p>The signatory will not see the name of the signature field, however it
will be used in the Evidence Log as a reference.</p>


</div>

<h5> <code>signature</code>  <code>(read only)</code> </h5>



<div class="json-schema">

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>When the signatory has not yet drawn a signature.</p>


</div>

<h6> <code>(string)</code> </h6>



<div class="json-schema">

<p>The File ID of the signature drawn by the signatory.</p>


</div>

</div>

<h5> <code>is_obligatory</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h5> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h5> <code>placements</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p><strong>Needs to be set, otherwise the signatory will not be able to draw a signature.</strong></p>
<p>Defines where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h4> SignatoryFieldStandard <code>(object)</code> </h4>



<div class="json-schema">

<p>A signatory field for placing a number of standard text fields on the
document:</p>
<ul>
<li>Company name</li>
<li>Company number</li>
<li>Personal number (AKA social security number)</li>
</ul>


<p>This object has the following properties:</p>

<h5> <code>type</code>  <code>(string, enum, required)</code> </h5>



<div class="json-schema">

<p>Used to specify what type of field this is.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"company"</code></li>
<li><code>"company_number"</code></li>
<li><code>"personal_number"</code></li>

</ul>

</div>

<h5> <code>value</code>  <code>(string)</code> </h5>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>
<p><strong>For the author</strong>: the value will revert to that set in the account settings.
Trying to set any other value will simply result in this field reverting
back to information set in account settings.</p>


<p>Default: <code>""</code></p>

</div>

<h5> <code>is_obligatory</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h5> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h5> <code>placements</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>If set, where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h4> SignatoryFieldCheckbox <code>(object)</code> </h4>



<div class="json-schema">

<p>A signatory field for placing checkboxes on the document.</p>


<p>This object has the following properties:</p>

<h5> <code>type</code>  <code>(string, enum, required)</code> </h5>



<div class="json-schema">

<p>Used to specify that this is a checkbox field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"checkbox"</code></li>

</ul>

</div>

<h5> <code>name</code>  <code>(string, required)</code> </h5>



<div class="json-schema">

<p>A name for the checkbox.</p>
<p>The signatory will not see the name of the checkbox, however it will be
used in the Evidence Log as a reference.</p>


</div>

<h5> <code>is_checked</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p><code>true</code> when the checkbox is checked, <code>false</code> otherwise.</p>
<p>Setting this to <code>true</code> on a document in preparation has the effect of
pre-checking the checkbox for the signatory.</p>


<p>Default: <code>false</code></p>

</div>

<h5> <code>is_obligatory</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Whether the signatory is obliged to check this checkbox in order to sign
the document.</p>


<p>Default: <code>true</code></p>

</div>

<h5> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h5> <code>placements</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p><strong>Needs to be set, otherwise there will be no checkbox visible to the signatory.</strong></p>
<p>Defines where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width.</p>
<p>Checkboxes can only be three sizes.
The numbers represent <em>small</em>, <em>medium</em> and <em>large</em> checkboxes.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0.011538</code></li>
<li><code>0.021153</code></li>
<li><code>0.0423076</code></li>

</ul>

</div>

<h6> <code>hrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, not used for checkboxes, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h6> <code>fsrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, not used for checkboxes, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h4> SignatoryFieldRadiogroup <code>(object)</code> </h4>



<div class="json-schema">

<p>A signatory field for placing radio buttons on the document.</p>


<p>This object has the following properties:</p>

<h5> <code>type</code>  <code>(string, enum, required)</code> </h5>



<div class="json-schema">

<p>Used to specify that this is a radio button group field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"radiogroup"</code></li>

</ul>

</div>

<h5> <code>name</code>  <code>(string, required)</code> </h5>



<div class="json-schema">

<p>A name for the radiogroup.</p>
<p>The signatory will not see the name of the radiogroup, however it will be
used in the Evidence Log as a reference.</p>


</div>

<h5> <code>values</code>  <code>(array, required)</code> </h5>



<div class="json-schema">

<p>An array of radio button option values.
The signatory will not see the name of the radio button values, however
they will be used in the Evidence Log as a reference.</p>
<p>These <em>must</em> correspond one-to-one with the list of <code>placements</code>: that is
the length of <code>values</code> <em>must</em> equal that of <code>placements</code> and vice-versa,
otherwise an error is returned.</p>
<p><strong>Must be equal in length to <code>placements</code> and have at least 2 items.
Each item must be unique and not an empty string.</strong></p>


<p>All array elements must be of type:</p>

<h6> <code>(string)</code> </h6>



<div class="json-schema">

<p>Empty strings are not allowed.</p>


</div>

</div>

<h5> <code>placements</code>  <code>(array, required)</code> </h5>



<div class="json-schema">

<p>Defines where the individual radio buttons should be placed on the
document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>These <em>must</em> correspond one-to-one with the list of <code>values</code>: that is the
length of <code>placements</code> <em>must</em> equal that of <code>vales</code> and vice-versa,
otherwise an error is returned.</p>
<p><strong>Must be equal in length to <code>values</code> and have at least 2 items.</strong></p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width.</p>
<p>Radio buttons can only be three sizes.
The numbers represent <em>small</em>, <em>medium</em> and <em>large</em> radio buttons.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0.014736</code></li>
<li><code>0.021052</code></li>
<li><code>0.025263</code></li>

</ul>

</div>

<h6> <code>hrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, not used for radio buttons, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h6> <code>fsrel</code>  <code>(number, enum, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, not used for radio buttons, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>
<p><strong>All radio buttons within the same group must be placed on the same page.</strong></p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

<h4> SignatoryFieldCustomText <code>(object)</code> </h4>



<div class="json-schema">

<p>A custom signatory field for text values. Can be used for any
text-based information. Must be placed on the document, otherwise
the signatory will not be asked to fill in details. Provides an
optional regular expression-based validation mechanism via the
<code>custom_validation</code> field (see below).</p>


<p>This object has the following properties:</p>

<h5> <code>type</code>  <code>(string, enum, required)</code> </h5>



<div class="json-schema">

<p>Used to specify that this is a custom text field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"text"</code></li>

</ul>

</div>

<h5> <code>name</code>  <code>(string, required)</code> </h5>



<div class="json-schema">

<p>A name for the custom field.</p>
<p>The name will be used as a placeholder value on the signing page, it will
also be used in the Evidence Log as a reference.</p>


</div>

<h5> <code>value</code>  <code>(string)</code> </h5>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>


<p>Default: <code>""</code></p>

</div>

<h5> <code>is_obligatory</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h5> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h5> <code>placements</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p><strong>Needs to be set, otherwise the signatory will not be asked or presented with this information.</strong></p>
<p>Defines where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>xrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h6> <code>yrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h6> <code>wrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>hrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h6> <code>fsrel</code>  <code>(number, required)</code> </h6>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h6> <code>page</code>  <code>(integer, required)</code> </h6>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h6> <code>tip</code>  </h6>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h6> <code>anchors</code>  <code>(array)</code> </h6>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

<h5> <code>custom_validation</code>  </h5>



<div class="json-schema">

<p>The value of this property must match <em>exactly one</em> of the following schemas:</p>


<h6> <code>(null)</code> </h6>



<div class="json-schema">

</div>

<h6> SignatoryFieldCustomValidation <code>(object)</code> </h6>



<div class="json-schema">

<p>Optional. Describes how to validate the input to this field using a
custom regular expression.</p>


<p>This object has the following properties:</p>

<h6> <code>pattern</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>Regular expression pattern for field validation.</p>


</div>

<h6> <code>positive_example</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>Example of an input that matches the pattern.</p>


</div>

<h6> <code>tooltip</code>  <code>(string, required)</code> </h6>



<div class="json-schema">

<p>Tooltip for the input text field.</p>


</div>

</div>

</div>

</div>

</div>

<h3> <code>sign_order</code>  <code>(integer)</code> </h3>



<div class="json-schema">

<p>Default: <code>1</code></p>

</div>

<h3> <code>sign_time</code>  <code>(string,null, read only)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>seen_time</code>  <code>(string,null, read only)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>read_invitation_time</code>  <code>(string,null, read only)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>rejected_time</code>  <code>(string,null, read only)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>rejection_reason</code>  <code>(string,null, read only)</code> </h3>



<div class="json-schema">

<p>Will only have a value if the signatory rejected the document, and will
contain the message from the signatory to explain rejection.
The Document <code>display_options</code> needs to allow the signatory to write a
reject reason (<code>allow_reject_reason</code>).</p>


</div>

<h3> <code>sign_success_redirect_url</code>  <code>(string,null)</code> </h3>



<div class="json-schema">

<p>The URL to redirect this party after they have signed the document.</p>


</div>

<h3> <code>reject_redirect_url</code>  <code>(string,null)</code> </h3>



<div class="json-schema">

<p>The URL to redirect this party if they reject the document.</p>


</div>

<h3> <code>email_delivery_status</code>  <code>(string, enum)</code> </h3>



<div class="json-schema">

<p>The current delivery status.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"unknown"</code></li>
<li><code>"not_delivered"</code></li>
<li><code>"delivered"</code></li>
<li><code>"deferred"</code></li>

</ul>

</div>

<h3> <code>mobile_delivery_status</code>  <code>(string, enum)</code> </h3>



<div class="json-schema">

<p>The current delivery status.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"unknown"</code></li>
<li><code>"not_delivered"</code></li>
<li><code>"delivered"</code></li>
<li><code>"deferred"</code></li>

</ul>

</div>

<h3> <code>csv</code>  <code>(array,null)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>delivery_method</code>  <code>(string, enum)</code> </h3>



<div class="json-schema">

<p>Note that <code>api</code> delivery is referred to as &quot;Link&quot; delivery in the Scrive Web
interface. Furthermore, <code>pad</code> delivery is referred to as &quot;In-person&quot;.</p>


<p>Default: <code>"email"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"email"</code></li>
<li><code>"mobile"</code></li>
<li><code>"email_mobile"</code></li>
<li><code>"pad"</code></li>
<li><code>"api"</code></li>

</ul>

</div>

<h3> <code>authentication_method_to_view</code>  <code>(string, enum)</code> </h3>



<div class="json-schema">

<p>This setting forces signatories to authenticate using the supplied identification method to view the document before signing.</p>


<p>Default: <code>"standard"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"standard"</code></li>
<li><code>"sms_pin"</code></li>
<li><code>"se_bankid"</code></li>
<li><code>"no_bankid"</code></li>
<li><code>"dk_nemid"</code></li>
<li><code>"fi_tupas"</code></li>
<li><code>"verimi"</code></li>
<li><code>"nl_idin"</code></li>

</ul>

</div>

<h3> <code>authentication_method_to_view_archived</code>  <code>(string, enum)</code> </h3>



<div class="json-schema">

<p>This setting forces signatories to authenticate using the supplied identification method to view the document once it has been signed and resides in the e-archive.</p>


<p>Default: <code>"standard"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"standard"</code></li>
<li><code>"sms_pin"</code></li>
<li><code>"se_bankid"</code></li>
<li><code>"no_bankid"</code></li>
<li><code>"dk_nemid"</code></li>
<li><code>"fi_tupas"</code></li>
<li><code>"verimi"</code></li>
<li><code>"nl_idin"</code></li>

</ul>

</div>

<h3> <code>authentication_method_to_sign</code>  <code>(string, enum)</code> </h3>



<div class="json-schema">

<p>Default: <code>"standard"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"standard"</code></li>
<li><code>"sms_pin"</code></li>
<li><code>"se_bankid"</code></li>
<li><code>"no_bankid"</code></li>
<li><code>"dk_nemid"</code></li>
<li><code>"fi_tupas"</code></li>
<li><code>"onfido_document_check"</code></li>
<li><code>"onfido_document_and_photo_check"</code></li>

</ul>

</div>

<h3> <code>confirmation_delivery_method</code>  <code>(string, enum)</code> </h3>



<div class="json-schema">

<p>Options allow delivery of the signed document as</p>
<ul>
<li><code>email</code> an attachment in email or</li>
<li><code>mobile</code> a link in a text message or</li>
<li><code>email_mobile</code> both of the two above or</li>
<li><code>email_link</code> a link in an email or</li>
<li><code>email_link_mobile</code> a link in both an email and a text message or</li>
<li><code>none</code> no delivery at all.</li>
</ul>


<p>Default: <code>"email"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"email"</code></li>
<li><code>"mobile"</code></li>
<li><code>"email_mobile"</code></li>
<li><code>"email_link"</code></li>
<li><code>"email_link_mobile"</code></li>
<li><code>"none"</code></li>

</ul>

</div>

<h3> <code>allows_highlighting</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Whether the signatory can highlight pages of the PDF when viewing the
signing page.</p>
<p>If any highlights are performed, the evidence log states that they were
performed while the signatory was viewing the document.</p>
<p>The intention of this feature is <strong>not</strong> for the signatory to affect a
contract via highlighting, but simply for a point-of-sale situation to
assist contract review.</p>


<p>Default: <code>false</code></p>

</div>

<h3> <code>hide_personal_number</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Whether the personal number should be hidden in the final PDF
verification page and the Evidence Log.</p>
<p>This is to be used when the document will be distributed to a wider
audience, and the personal number of the signatory should not be
available in the final document.</p>
<p><strong>If the signatory has a placed field for their personal number, it will
be included in the final PDF</strong>. So this solution only works when the
field does not have any placements.</p>


<p>Default: <code>false</code></p>

</div>

<h3> <code>highlighted_pages</code>  <code>(array, read only)</code> </h3>



<div class="json-schema">

<p>A list of highlights performed by the signatory.</p>
<p>While a document is pending, highlights may be added, but will not appear
in the document file PDF until after the document is closed.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>page</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>The page number which is highlighted (starts from <code>1</code>).
Each signatory can only have one highlight per page.</p>


</div>

<h5> <code>file_id</code>  <code>(string)</code> </h5>



<div class="json-schema">

<p>The <code>file_id</code> for an image of the highlights.</p>
<p>The image dimensions will fit the ratio of the PDF page, and will be
of a fixed colour and transparency.</p>
<p>This will be integrated into the final PDF once the document is
closed.</p>


</div>

</div>

</div>

<h3> <code>attachments</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>An attachment requested from the signing party.
Attachments requested from viewing only parties have no effect.</p>


<p>This object has the following properties:</p>

<h5> <code>name</code>  <code>(string)</code> </h5>



<div class="json-schema">

<p>A name for the requested attachment.
Will be visible to the signatory when signing the document.</p>


</div>

<h5> <code>description</code>  <code>(string)</code> </h5>



<div class="json-schema">

<p>A description for the requested attachment.
Will be visible to the signatory when signing the document alongside
the attachment name.</p>


</div>

<h5> <code>required</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

<p>Whether the signatory must upload this attachment.
If <code>false</code>, the signatory may choose not to upload this attachment
when signing.</p>


<p>Default: <code>true</code></p>

</div>

<h5> <code>file_id</code>  <code>(string)</code> </h5>



<div class="json-schema">

<p>Will be present if and when the party uploads this attachment.</p>


</div>

<h5> <code>file_name</code>  <code>(string)</code> </h5>



<div class="json-schema">

<p>Will be present if and when the party uploads this attachment.</p>


</div>

</div>

</div>

<h3> <code>api_delivery_url</code>  <code>(string,null)</code> </h3>



<div class="json-schema">

<p>If the <code>delivery_method</code> is set to <code>api</code>, then this field will hold the
relative URL for the party.</p>
<p>Note that <code>api</code> delivery is referred to as &quot;Link&quot; delivery in the Scrive Web
interface.</p>
<p>This will only be available after the signing process has been started,
and will only be visible when accessing the document as the author.</p>


</div>

<h3> <code>consent_module</code>  </h3>



<div class="json-schema">

<p>The value of this property must match <em>exactly one</em> of the following schemas:</p>


<h4> <code>(null)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>If present, a section will be shown asking the signatory to answer some
questions which must be answered by the signatory with either the positive
or the negative option specified.</p>


<p>This object has the following properties:</p>

<h5> <code>title</code>  <code>(string)</code> </h5>



<div class="json-schema">

<p>Section title.</p>


</div>

<h5> <code>questions</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>title</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Question text.</p>


</div>

<h6> <code>positive_option</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>negative_option</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>response</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

<p>Will be present when the party has answered the question. <code>true</code>
when the signatory selected the positive response and <code>false</code>
when the signatory selected the negative response.</p>


</div>

<h6> <code>detailed_description</code>  <code>(object)</code> </h6>



<div class="json-schema">

<p>Optional additional information to show the signatory.</p>


<p>The <code>detailed_description</code> object has the following properties:</p>

<h6> <code>title</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Title of the section. Will be shown in a button.</p>


</div>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

<p>Explanation of the question. New lines are shown as is.</p>


</div>

</div>

</div>

</div>

</div>

</div>

</div>

## SignatoryFieldName
`(object)`

> ### Example JSON: for "SignatoryFieldName"

```json
{
  "type": "name",
  "order": 1,
  "value": "John",
  "is_obligatory": true,
  "should_be_filled_by_sender": false,
  "placements": [
    {
      "xrel": 0.26105263157894737,
      "yrel": 0.0975609756097561,
      "wrel": 0.07894736842105263,
      "hrel": 0.024390243902439025,
      "fsrel": 0.01263157894736842,
      "page": 1,
      "tip": "right",
      "anchors": []
    }
  ]
}
```




<div class="json-schema">

<p>A signatory field for the name(s) of the party.</p>


<p>This object has the following properties:</p>

<h3> <code>type</code>  <code>(string, enum, required)</code> </h3>



<div class="json-schema">

<p>Used to specify that this is a name field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"name"</code></li>

</ul>

</div>

<h3> <code>order</code>  <code>(integer, enum, required)</code> </h3>



<div class="json-schema">

<p>Whether this is the first name (<em>i.e.</em> given name)
or second name (<em>i.e.</em> last name or surname).</p>
<p>Please ensure that there is exacatly one first name and one second name
field, otherwise the signatory may not be asked for their name on the
signing page.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>1</code></li>
<li><code>2</code></li>

</ul>

</div>

<h3> <code>value</code>  <code>(string)</code> </h3>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>


<p>Default: <code>""</code></p>

</div>

<h3> <code>is_obligatory</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h3> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h3> <code>placements</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p>If set, where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>xrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h5> <code>yrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h5> <code>wrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h5> <code>hrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h5> <code>fsrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h5> <code>page</code>  <code>(integer, required)</code> </h5>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h5> <code>tip</code>  </h5>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h5> <code>anchors</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

## SignatoryFieldEmailMobile
`(object)`

> ### Example JSON: for "SignatoryFieldEmailMobile"

```json
{
  "type": "mobile",
  "value": "+461234567890",
  "is_obligatory": false,
  "should_be_filled_by_sender": false,
  "editable_by_signatory": false,
  "placements": [
    {
      "xrel": 0.09052631578947369,
      "yrel": 0.2700892857142857,
      "wrel": 0.09157894736842105,
      "hrel": 0.025297619047619048,
      "fsrel": 0.016842105263157894,
      "page": 1,
      "tip": "right",
      "anchors": []
    }
  ]
}
```




<div class="json-schema">

<p>A signatory field for email addresses and mobile numbers.</p>


<p>This object has the following properties:</p>

<h3> <code>type</code>  <code>(string, enum, required)</code> </h3>



<div class="json-schema">

<p>Used to specify what type of field this is.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"email"</code></li>
<li><code>"mobile"</code></li>

</ul>

</div>

<h3> <code>value</code>  <code>(string)</code> </h3>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>
<p><strong>For the author</strong>: the value will revert to that set in the account settings.
Trying to set any other value will simply result in this field reverting
back to information set in account settings.</p>


<p>Default: <code>""</code></p>

</div>

<h3> <code>is_obligatory</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h3> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h3> <code>editable_by_signatory</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Whether the signatory can edit a pre-filled value for this field.
This is useful when you have signatory details on file, but you want them
to be able to modify their email or mobile if it has changed.</p>
<p><strong>Note:</strong> Setting this to <code>true</code> means a signatory will <em>always</em> be able
to change the value on the signing page.
If you want a signatory to authenticate with SMS PIN, please be aware
that this may affect your desired workflow.</p>


<p>Default: <code>false</code></p>

</div>

<h3> <code>placements</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p>If set, where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>xrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h5> <code>yrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h5> <code>wrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h5> <code>hrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h5> <code>fsrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h5> <code>page</code>  <code>(integer, required)</code> </h5>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h5> <code>tip</code>  </h5>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h5> <code>anchors</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

## SignatoryFieldSignature
`(object)`

> ### Example JSON: for "SignatoryFieldSignature"

```json
{
  "type": "signature",
  "name": "Signature 1",
  "signature": "9215148251416996589",
  "is_obligatory": true,
  "should_be_filled_by_sender": false,
  "placements": [
    {
      "xrel": 0.3510526315789474,
      "yrel": 0.1796747967479675,
      "wrel": 0.2736842105263158,
      "hrel": 0.08292682926829269,
      "fsrel": 0.0168,
      "page": 1,
      "tip": "right",
      "anchors": []
    }
  ]
}
```




<div class="json-schema">

<p>A signatory field for placing signature boxes on the document.</p>


<p>This object has the following properties:</p>

<h3> <code>type</code>  <code>(string, enum, required)</code> </h3>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"signature"</code></li>

</ul>

</div>

<h3> <code>name</code>  <code>(string, required)</code> </h3>



<div class="json-schema">

<p>A name for the signature field.</p>
<p>The signatory will not see the name of the signature field, however it
will be used in the Evidence Log as a reference.</p>


</div>

<h3> <code>signature</code>  <code>(read only)</code> </h3>



<div class="json-schema">

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h4> <code>(null)</code> </h4>



<div class="json-schema">

<p>When the signatory has not yet drawn a signature.</p>


</div>

<h4> <code>(string)</code> </h4>



<div class="json-schema">

<p>The File ID of the signature drawn by the signatory.</p>


</div>

</div>

<h3> <code>is_obligatory</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h3> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h3> <code>placements</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p><strong>Needs to be set, otherwise the signatory will not be able to draw a signature.</strong></p>
<p>Defines where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>xrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h5> <code>yrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h5> <code>wrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h5> <code>hrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h5> <code>fsrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h5> <code>page</code>  <code>(integer, required)</code> </h5>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h5> <code>tip</code>  </h5>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h5> <code>anchors</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

## SignatoryFieldStandard
`(object)`

> ### Example JSON: for "SignatoryFieldStandard"

```json
{
  "type": "company",
  "value": "Scrive AB",
  "is_obligatory": false,
  "should_be_filled_by_sender": false,
  "placements": [
    {
      "xrel": 0.09052631578947369,
      "yrel": 0.2700892857142857,
      "wrel": 0.09157894736842105,
      "hrel": 0.025297619047619048,
      "fsrel": 0.016842105263157894,
      "page": 1,
      "tip": "right",
      "anchors": []
    }
  ]
}
```




<div class="json-schema">

<p>A signatory field for placing a number of standard text fields on the
document:</p>
<ul>
<li>Company name</li>
<li>Company number</li>
<li>Personal number (AKA social security number)</li>
</ul>


<p>This object has the following properties:</p>

<h3> <code>type</code>  <code>(string, enum, required)</code> </h3>



<div class="json-schema">

<p>Used to specify what type of field this is.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"company"</code></li>
<li><code>"company_number"</code></li>
<li><code>"personal_number"</code></li>

</ul>

</div>

<h3> <code>value</code>  <code>(string)</code> </h3>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>
<p><strong>For the author</strong>: the value will revert to that set in the account settings.
Trying to set any other value will simply result in this field reverting
back to information set in account settings.</p>


<p>Default: <code>""</code></p>

</div>

<h3> <code>is_obligatory</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h3> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h3> <code>placements</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p>If set, where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>xrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h5> <code>yrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h5> <code>wrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h5> <code>hrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h5> <code>fsrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h5> <code>page</code>  <code>(integer, required)</code> </h5>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h5> <code>tip</code>  </h5>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h5> <code>anchors</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

## SignatoryFieldCheckbox
`(object)`

> ### Example JSON: for "SignatoryFieldCheckbox"

```json
{
  "type": "checkbox",
  "name": "Checkbox Name",
  "is_checked": true,
  "is_obligatory": true,
  "should_be_filled_by_sender": false,
  "placements": [
    {
      "xrel": 0.17526315789473684,
      "yrel": 0.3382113821138211,
      "wrel": 0.011538,
      "hrel": 0,
      "fsrel": 0,
      "page": 1,
      "tip": "left",
      "anchors": []
    }
  ]
}
```




<div class="json-schema">

<p>A signatory field for placing checkboxes on the document.</p>


<p>This object has the following properties:</p>

<h3> <code>type</code>  <code>(string, enum, required)</code> </h3>



<div class="json-schema">

<p>Used to specify that this is a checkbox field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"checkbox"</code></li>

</ul>

</div>

<h3> <code>name</code>  <code>(string, required)</code> </h3>



<div class="json-schema">

<p>A name for the checkbox.</p>
<p>The signatory will not see the name of the checkbox, however it will be
used in the Evidence Log as a reference.</p>


</div>

<h3> <code>is_checked</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p><code>true</code> when the checkbox is checked, <code>false</code> otherwise.</p>
<p>Setting this to <code>true</code> on a document in preparation has the effect of
pre-checking the checkbox for the signatory.</p>


<p>Default: <code>false</code></p>

</div>

<h3> <code>is_obligatory</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Whether the signatory is obliged to check this checkbox in order to sign
the document.</p>


<p>Default: <code>true</code></p>

</div>

<h3> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h3> <code>placements</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p><strong>Needs to be set, otherwise there will be no checkbox visible to the signatory.</strong></p>
<p>Defines where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>xrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h5> <code>yrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h5> <code>wrel</code>  <code>(number, enum, required)</code> </h5>



<div class="json-schema">

<p>Width of placement, as proportion of total width.</p>
<p>Checkboxes can only be three sizes.
The numbers represent <em>small</em>, <em>medium</em> and <em>large</em> checkboxes.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0.011538</code></li>
<li><code>0.021153</code></li>
<li><code>0.0423076</code></li>

</ul>

</div>

<h5> <code>hrel</code>  <code>(number, enum, required)</code> </h5>



<div class="json-schema">

<p>Height of placement, not used for checkboxes, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h5> <code>fsrel</code>  <code>(number, enum, required)</code> </h5>



<div class="json-schema">

<p>Font size of placement, not used for checkboxes, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h5> <code>page</code>  <code>(integer, required)</code> </h5>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h5> <code>tip</code>  </h5>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h5> <code>anchors</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

## SignatoryFieldRadiogroup
`(object)`

> ### Example JSON: for "SignatoryFieldRadiogroup"

```json
{
  "type": "radiogroup",
  "name": "Large Radio buttons",
  "selected_value": "Radio button 2",
  "placements": [
    {
      "xrel": 0.7405263157894737,
      "yrel": 0.3796747967479675,
      "wrel": 0.025263,
      "hrel": 0,
      "fsrel": 0,
      "page": 1,
      "tip": "right",
      "anchors": []
    },
    {
      "xrel": 0.7405263157894737,
      "yrel": 0.4008130081300813,
      "wrel": 0.021052,
      "hrel": 0,
      "fsrel": 0,
      "page": 1,
      "tip": "right",
      "anchors": []
    },
    {
      "xrel": 0.7410526315789474,
      "yrel": 0.4211382113821138,
      "wrel": 0.014736,
      "hrel": 0,
      "fsrel": 0,
      "page": 1,
      "tip": "right",
      "anchors": []
    }
  ],
  "values": [
    "Radio button 1",
    "Radio button 2",
    "Radio button 3"
  ]
}
```




<div class="json-schema">

<p>A signatory field for placing radio buttons on the document.</p>


<p>This object has the following properties:</p>

<h3> <code>type</code>  <code>(string, enum, required)</code> </h3>



<div class="json-schema">

<p>Used to specify that this is a radio button group field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"radiogroup"</code></li>

</ul>

</div>

<h3> <code>name</code>  <code>(string, required)</code> </h3>



<div class="json-schema">

<p>A name for the radiogroup.</p>
<p>The signatory will not see the name of the radiogroup, however it will be
used in the Evidence Log as a reference.</p>


</div>

<h3> <code>values</code>  <code>(array, required)</code> </h3>



<div class="json-schema">

<p>An array of radio button option values.
The signatory will not see the name of the radio button values, however
they will be used in the Evidence Log as a reference.</p>
<p>These <em>must</em> correspond one-to-one with the list of <code>placements</code>: that is
the length of <code>values</code> <em>must</em> equal that of <code>placements</code> and vice-versa,
otherwise an error is returned.</p>
<p><strong>Must be equal in length to <code>placements</code> and have at least 2 items.
Each item must be unique and not an empty string.</strong></p>


<p>All array elements must be of type:</p>

<h4> <code>(string)</code> </h4>



<div class="json-schema">

<p>Empty strings are not allowed.</p>


</div>

</div>

<h3> <code>placements</code>  <code>(array, required)</code> </h3>



<div class="json-schema">

<p>Defines where the individual radio buttons should be placed on the
document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>These <em>must</em> correspond one-to-one with the list of <code>values</code>: that is the
length of <code>placements</code> <em>must</em> equal that of <code>vales</code> and vice-versa,
otherwise an error is returned.</p>
<p><strong>Must be equal in length to <code>values</code> and have at least 2 items.</strong></p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>xrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h5> <code>yrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h5> <code>wrel</code>  <code>(number, enum, required)</code> </h5>



<div class="json-schema">

<p>Width of placement, as proportion of total width.</p>
<p>Radio buttons can only be three sizes.
The numbers represent <em>small</em>, <em>medium</em> and <em>large</em> radio buttons.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0.014736</code></li>
<li><code>0.021052</code></li>
<li><code>0.025263</code></li>

</ul>

</div>

<h5> <code>hrel</code>  <code>(number, enum, required)</code> </h5>



<div class="json-schema">

<p>Height of placement, not used for radio buttons, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h5> <code>fsrel</code>  <code>(number, enum, required)</code> </h5>



<div class="json-schema">

<p>Font size of placement, not used for radio buttons, must be 0.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>0</code></li>

</ul>

</div>

<h5> <code>page</code>  <code>(integer, required)</code> </h5>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>
<p><strong>All radio buttons within the same group must be placed on the same page.</strong></p>


</div>

<h5> <code>tip</code>  </h5>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h5> <code>anchors</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

## SignatoryFieldCustomText
`(object)`

> ### Example JSON: for "SignatoryFieldCustomText"

```json
{
  "type": "text",
  "name": "Custom Field Name",
  "value": "",
  "is_obligatory": true,
  "should_be_filled_by_sender": true,
  "placements": [
    {
      "xrel": 0.29368421052631577,
      "yrel": 0.3444940476190476,
      "wrel": 0.10842105263157895,
      "hrel": 0.025297619047619048,
      "fsrel": 0.016842105263157894,
      "page": 1,
      "tip": "right",
      "anchors": []
    }
  ],
  "custom_validation": {
    "pattern": "^foo|bar|baz$",
    "positive_example": "foo",
    "tooltip": "Must be either 'foo', 'bar', or 'baz'."
  }
}
```




<div class="json-schema">

<p>A custom signatory field for text values. Can be used for any
text-based information. Must be placed on the document, otherwise
the signatory will not be asked to fill in details. Provides an
optional regular expression-based validation mechanism via the
<code>custom_validation</code> field (see below).</p>


<p>This object has the following properties:</p>

<h3> <code>type</code>  <code>(string, enum, required)</code> </h3>



<div class="json-schema">

<p>Used to specify that this is a custom text field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"text"</code></li>

</ul>

</div>

<h3> <code>name</code>  <code>(string, required)</code> </h3>



<div class="json-schema">

<p>A name for the custom field.</p>
<p>The name will be used as a placeholder value on the signing page, it will
also be used in the Evidence Log as a reference.</p>


</div>

<h3> <code>value</code>  <code>(string)</code> </h3>



<div class="json-schema">

<p>Either a pre-filled value, or the value entered by the signatory.</p>


<p>Default: <code>""</code></p>

</div>

<h3> <code>is_obligatory</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Default: <code>true</code></p>

</div>

<h3> <code>should_be_filled_by_sender</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Default: <code>false</code></p>

</div>

<h3> <code>placements</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p><strong>Needs to be set, otherwise the signatory will not be asked or presented with this information.</strong></p>
<p>Defines where this field should be placed on the document.
This is both for the signatory to fill out on the signing page, and for
the final sealed PDF.</p>
<p>Note that this is an array, you can have multiple placements for the same
field.</p>
<p>The easiest way to set the <code>xrel</code>, <code>yrel</code>, etc. values is to create a
template in the document UI design view, and use those values.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>xrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the x-axis, from 0 to 1.</p>


</div>

<h5> <code>yrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Position on the y-axis, from 0 to 1.</p>


</div>

<h5> <code>wrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Width of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h5> <code>hrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Height of placement, as proportion of total height, from 0 to 1.</p>


</div>

<h5> <code>fsrel</code>  <code>(number, required)</code> </h5>



<div class="json-schema">

<p>Font size of placement, as proportion of total width, from 0 to 1.</p>


</div>

<h5> <code>page</code>  <code>(integer, required)</code> </h5>



<div class="json-schema">

<p>The page number for this placement, starting from 1.</p>


</div>

<h5> <code>tip</code>  </h5>



<div class="json-schema">

<p>Default: <code>null</code></p>

<p>The value of this property must match <em>at least one</em> of the following schemas:</p>


<h6> <code>(string, enum)</code> </h6>



<div class="json-schema">

<p>From which side the arrow on the signing page should point
to the field.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"left"</code></li>
<li><code>"right"</code></li>

</ul>

</div>

<h6> <code>(null)</code> </h6>



<div class="json-schema">

<p>Let the signing page default to either <code>left</code> or <code>right</code>
depending on the field type.</p>


</div>

</div>

<h5> <code>anchors</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>text</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>index</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

<h3> <code>custom_validation</code>  </h3>



<div class="json-schema">

<p>The value of this property must match <em>exactly one</em> of the following schemas:</p>


<h4> <code>(null)</code> </h4>



<div class="json-schema">

</div>

<h4> SignatoryFieldCustomValidation <code>(object)</code> </h4>



<div class="json-schema">

<p>Optional. Describes how to validate the input to this field using a
custom regular expression.</p>


<p>This object has the following properties:</p>

<h5> <code>pattern</code>  <code>(string, required)</code> </h5>



<div class="json-schema">

<p>Regular expression pattern for field validation.</p>


</div>

<h5> <code>positive_example</code>  <code>(string, required)</code> </h5>



<div class="json-schema">

<p>Example of an input that matches the pattern.</p>


</div>

<h5> <code>tooltip</code>  <code>(string, required)</code> </h5>



<div class="json-schema">

<p>Tooltip for the input text field.</p>


</div>

</div>

</div>

</div>

## List Filter
`(array)`

> ### Example JSON: for "List Filter"

```json
[
  {
    "filter_by": "status",
    "statuses": [
      "preparation",
      "pending"
    ]
  }
]
```




<div class="json-schema">

<p>Parameter used to filter documents for the <code>list</code> API call.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>Each element of this array must match <em>at least one</em> of the following schemas:</p>


<h3> Filter by status <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"status"</code></li>

</ul>

</div>

<h4> <code>statuses</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h5> Document Status <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>The current document status.</p>
<p>A document in &quot;preparation&quot; can be changed using the <code>update</code> call and the
main file can also be set or changed.</p>
<p>Once the document signing process has begun, the document will be &quot;pending&quot;.</p>
<p>Once all parties have successfully signed the document is &quot;closed&quot; and cannot
be changed.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"preparation"</code></li>
<li><code>"pending"</code></li>
<li><code>"closed"</code></li>
<li><code>"canceled"</code></li>
<li><code>"timedout"</code></li>
<li><code>"rejected"</code></li>
<li><code>"document_error"</code></li>

</ul>

</div>

</div>

</div>

<h3> Filter by mtime <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"mtime"</code></li>

</ul>

</div>

<h4> <code>start_time</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>end_time</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

</div>

<h3> Filter by tag <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"tag"</code></li>

</ul>

</div>

<h4> <code>value</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>name</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

</div>

<h3> Filter by author <code>(object)</code> </h3>



<div class="json-schema">

<p>Only include documents where the person making the API call is the
document author.</p>


<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"is_author"</code></li>

</ul>

</div>

</div>

<h3> Signable on pad <code>(object)</code> </h3>



<div class="json-schema">

<p>This implicitly adds an <code>is_author</code> filter.</p>


<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"is_signable_on_pad"</code></li>

</ul>

</div>

</div>

<h3> Only templates <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"is_template"</code></li>

</ul>

</div>

</div>

<h3> Only non-templates <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"is_not_template"</code></li>

</ul>

</div>

</div>

<h3> In trash <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"is_in_trash"</code></li>

</ul>

</div>

</div>

<h3> Not in trash <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"is_not_in_trash"</code></li>

</ul>

</div>

</div>

<h3> Filter by author id <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"author"</code></li>

</ul>

</div>

<h4> <code>user_id</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

</div>

<h3> Signable by user <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"user_can_sign"</code></li>

</ul>

</div>

<h4> <code>user_id</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

</div>

<h3> Filter by text <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"text"</code></li>

</ul>

</div>

<h4> <code>text</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

</div>

</div>

## List Sorting
`(array)`

> ### Example JSON: for "List Sorting"

```json
[
  {
    "sort_by": "author",
    "order": "ascending"
  }
]
```




<div class="json-schema">

<p>Parameter used to sort documents for the <code>list</code> API call.</p>


<p>All array elements must be of type:</p>

<h3> <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>order</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>Default: <code>"ascending"</code></p>

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"ascending"</code></li>
<li><code>"descending"</code></li>

</ul>

</div>

<h4> <code>sort_by</code>  <code>(string, enum, required)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"title"</code></li>
<li><code>"status"</code></li>
<li><code>"mtime"</code></li>
<li><code>"author"</code></li>

</ul>

</div>

</div>

</div>

## Author Attachments
`(array)`

> ### Example JSON: for "Author Attachments"

```json
[
  {
    "name": "Attachment using ID",
    "required": false,
    "add_to_sealed_file": true,
    "file_id": "36"
  },
  {
    "name": "Attachment using parameter",
    "required": false,
    "add_to_sealed_file": true,
    "file_param": "file_1"
  }
]
```




<div class="json-schema">

<p>Attachments that have been added to a document by the author.</p>


<p>Each element of this array must match <em>at least one</em> of the following schemas:</p>


<h3> <code>(object)</code> </h3>



<div class="json-schema">

<p>Attachment that is uploaded as part of the API call.</p>


<p>This object has the following properties:</p>

<h4> <code>name</code>  <code>(string, required)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>required</code>  <code>(boolean, required)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>add_to_sealed_file</code>  <code>(boolean, required)</code> </h4>



<div class="json-schema">

<p>Whether to add the attachment to the sealed file after signing</p>


</div>

<h4> <code>file_param</code>  <code>(string, required)</code> </h4>



<div class="json-schema">

<p>The parameter name used in the API call for this attachment.</p>


</div>

</div>

<h3> <code>(object)</code> </h3>



<div class="json-schema">

<p>Attachment that references a <code>file_id</code>.</p>


<p>This object has the following properties:</p>

<h4> <code>name</code>  <code>(string, required)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>required</code>  <code>(boolean, required)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>add_to_sealed_file</code>  <code>(boolean, required)</code> </h4>



<div class="json-schema">

<p>Whether to add the attachment to the sealed file after signing</p>


</div>

<h4> <code>file_id</code>  <code>(integer, required)</code> </h4>



<div class="json-schema">

</div>

</div>

</div>

## History Items
`(object)`

> ### Example JSON: for "History Items"

```json
{
  "events": [
    {
      "status": "initiated",
      "time": "2015-06-06T17:50:15Z",
      "party": "Not named party (1)",
      "text": "The signing process was initiated."
    }
  ]
}
```




<div class="json-schema">

<p>The type returned by the Document History API call.</p>
<p>This can be used to show the progress of a document to the user.</p>


<p>This object has the following properties:</p>

<h3> <code>events</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>status</code>  <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>The document status &quot;class&quot;, not the same as the statuses
available for documents.</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"initiated"</code></li>
<li><code>"draft"</code></li>
<li><code>"cancelled"</code></li>
<li><code>"rejected"</code></li>
<li><code>"timeouted"</code></li>
<li><code>"problem"</code></li>
<li><code>"deliveryproblem"</code></li>
<li><code>"sent"</code></li>
<li><code>"delivered"</code></li>
<li><code>"read"</code></li>
<li><code>"opened"</code></li>
<li><code>"signed"</code></li>
<li><code>"prolonged"</code></li>
<li><code>"sealed"</code></li>
<li><code>"extended"</code></li>

</ul>

</div>

<h5> <code>time</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>text</code>  <code>(string)</code> </h5>



<div class="json-schema">

<p>The text describing the action.</p>


</div>

<h5> <code>party</code>  <code>(string)</code> </h5>



<div class="json-schema">

<p>The name of the party performing the action.</p>


</div>

</div>

</div>

</div>

## Attachment
`(object)`

> ### Example JSON: for "Attachment"

```json
{
  "id": "2",
  "title": "Terms and conditions",
  "time": "2018-06-21T08:25:22.644059Z",
  "shared": false,
  "file": "2"
}
```




<div class="json-schema">

<p>A pre-uploaded attachment which can later be used when creating or signing
documents.</p>


<p>This object has the following properties:</p>

<h3> <code>id</code>  <code>(string, read only)</code> </h3>



<div class="json-schema">

<p><strong>Unique identifier for an attachment.</strong></p>
<p>Will not change over time, and cannot be changed.</p>


</div>

<h3> <code>title</code>  <code>(string, read only)</code> </h3>



<div class="json-schema">

<p><strong>The title of the attachment.</strong></p>
<p>The title will be used when listing attachments.</p>


</div>

<h3> <code>file</code>  <code>(string, read only)</code> </h3>



<div class="json-schema">

<p><strong>The attachment’s file ID.</strong></p>


</div>

<h3> <code>shared</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p><strong>Sharing status.</strong></p>
<p>Whether the attachment is shared with the other members of the company.</p>


</div>

<h3> <code>time</code>  <code>(string, read only)</code> </h3>



<div class="json-schema">

<p>Time at which the attachment was added.</p>


</div>

</div>

## Attachment List Filter
`(array)`

> ### Example JSON: for "Attachment List Filter"

```json
[
  {
    "filter_by": "text",
    "text": "keyword"
  }
]
```




<div class="json-schema">

<p>Parameter used to filter attachments for the <code>list</code> API call.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>Each element of this array must match <em>at least one</em> of the following schemas:</p>


<h3> Filter by text <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>filter_by</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"text"</code></li>

</ul>

</div>

<h4> <code>text</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

</div>

</div>

## DataRetentionPolicy
`(object)`

> ### Example JSON: for "DataRetentionPolicy"

```json
{
  "idle_doc_timeout_canceled": 45,
  "immediate_trash": true,
  "idle_doc_timeout_error": 67,
  "idle_doc_timeout_preparation": 32
}
```




<div class="json-schema">

<p>An object with data retention policy properties.</p>


<p>This object has the following properties:</p>

<h3> <code>immediate_trash</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

<p>Option to delete documents in trash immediately</p>


</div>

<h3> <code>idle_doc_timeout_preparation</code>  <code>(integer)</code> </h3>



<div class="json-schema">

<p>Number of days before moving documents in preparation to trash</p>


</div>

<h3> <code>idle_doc_timeout_closed</code>  <code>(integer)</code> </h3>



<div class="json-schema">

<p>Number of days before moving closed documents to trash</p>


</div>

<h3> <code>idle_doc_timeout_canceled</code>  <code>(integer)</code> </h3>



<div class="json-schema">

<p>Number of days before moving cancelled documents to trash</p>


</div>

<h3> <code>idle_doc_timeout_timedout</code>  <code>(integer)</code> </h3>



<div class="json-schema">

<p>Number of days before moving timed out documents to trash</p>


</div>

<h3> <code>idle_doc_timeout_rejected</code>  <code>(integer)</code> </h3>



<div class="json-schema">

<p>Number of days before moving rejected documents to trash</p>


</div>

<h3> <code>idle_doc_timeout_error</code>  <code>(integer)</code> </h3>



<div class="json-schema">

<p>Number of days before moving documents with errors to trash</p>


</div>

</div>

## DataRetentionPolicies
`(object)`

> ### Example JSON: for "DataRetentionPolicies"

```json
{
  "company_data_retention_policy": {
    "immediate_trash": false
  },
  "data_retention_policy": {
    "idle_doc_timeout_canceled": 45,
    "immediate_trash": true,
    "idle_doc_timeout_error": 67,
    "idle_doc_timeout_preparation": 32
  }
}
```




<div class="json-schema">

<p>An object with data retention policies properties.</p>


<p>This object has the following properties:</p>

<h3> <code>company_data_retention_policy</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>An object with data retention policy properties.</p>


<p>The <code>company_data_retention_policy</code> object has the following properties:</p>

<h4> <code>immediate_trash</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

<p>Option to delete documents in trash immediately</p>


</div>

<h4> <code>idle_doc_timeout_preparation</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days before moving documents in preparation to trash</p>


</div>

<h4> <code>idle_doc_timeout_closed</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days before moving closed documents to trash</p>


</div>

<h4> <code>idle_doc_timeout_canceled</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days before moving cancelled documents to trash</p>


</div>

<h4> <code>idle_doc_timeout_timedout</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days before moving timed out documents to trash</p>


</div>

<h4> <code>idle_doc_timeout_rejected</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days before moving rejected documents to trash</p>


</div>

<h4> <code>idle_doc_timeout_error</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days before moving documents with errors to trash</p>


</div>

</div>

<h3> <code>data_retention_policy</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>An object with data retention policy properties.</p>


<p>The <code>data_retention_policy</code> object has the following properties:</p>

<h4> <code>immediate_trash</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

<p>Option to delete documents in trash immediately</p>


</div>

<h4> <code>idle_doc_timeout_preparation</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days before moving documents in preparation to trash</p>


</div>

<h4> <code>idle_doc_timeout_closed</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days before moving closed documents to trash</p>


</div>

<h4> <code>idle_doc_timeout_canceled</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days before moving cancelled documents to trash</p>


</div>

<h4> <code>idle_doc_timeout_timedout</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days before moving timed out documents to trash</p>


</div>

<h4> <code>idle_doc_timeout_rejected</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days before moving rejected documents to trash</p>


</div>

<h4> <code>idle_doc_timeout_error</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days before moving documents with errors to trash</p>


</div>

</div>

</div>

## OAuthAuthorization
`(object)`


<div class="json-schema">

<p>This object has the following properties:</p>

<h3> <code>apitoken</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>apisecret</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>accesstoken</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>accesssecret</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

</div>

## UserStats
`(object)`

> ### Example JSON: for "UserStats"

```json
{
  "stats": [
    {
      "date": "2019-01-03",
      "name": "Organisation total",
      "sent": 1,
      "closed": 1,
      "signatures": 1,
      "user_stats": [
        {
          "date": "2019-01-03",
          "email": "demo@scrive.com",
          "name": " ",
          "sent": 1,
          "closed": 1,
          "signatures": 1
        }
      ]
    }
  ]
}
```




<div class="json-schema">

<p>A JSON object with the statistics on usage:
count of documents on different stages of the process</p>


<p>This object has the following properties:</p>

<h3> <code>stats</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>date</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>sent</code>  <code>(integer)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>closed</code>  <code>(integer)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>signatures</code>  <code>(integer)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>user_stats</code>  <code>(array)</code> </h5>



<div class="json-schema">

<p>Only present when the <code>withCompany</code> flag is set</p>


<p>All array elements must be of type:</p>

<h6> <code>(object)</code> </h6>



<div class="json-schema">

<p>This object has the following properties:</p>

<h6> <code>date</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>email</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>name</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>sent</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>closed</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>signatures</code>  <code>(integer)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

</div>

</div>

## LoginToken
`(object)`

> ### Example JSON: for "LoginToken"

```json
{
  "login_token": "a537e5e43d5b4095",
  "qr_code": "iVBORw0KGgoAAAANSUhEUgAAAzQAAAM0AQMAAABXvPU0AAAABlBMVEUAAAD///+l2Z/dAAAAAnRSTlP//8i138cAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAL8SURBVHic7dpLbuswDAVQ70D736V34AJFLFKfpJ28B9A9HBiRLd6jIWHnuP5PHRwOh8PhcDgcDofD4XA4HA6Hw+FwOBwOh8PhcP6Cc8zV+oOWL9d15l3fy88BHA6Hw+Fw6jrp/ib9Tno5rQe3DwEcDofD4XDqO9G6ZyP4HkZ+F8DhcDgcDucxTl4ePfgc30608cLhcDgcDufZTsTt9x0bkcPhcDgczsOcXVx+J3F/wnjVmTN3ARwOh8PhcIo7Uw39v7qsARwOh8PhcEo7+4oRZK03mdutHA6Hw+FwKjpTVyzyHxsGNkaQacv6+YPD4XA4HE5JJ1pfdS5xkRnnyQdoPeXISw6Hw+FwOFWdiVjS7/5pyBjiesfxad7hcDgcDodTxckvIebXDD0uDhD7diMIh8PhcDicRzjRPyUty2MM3g4e04DC4XA4HA6npJNDhsxd625LHlWGo3A4HA6Hw6nqTA15GV1TyJl/LQe9OBwOh8PhFHc+zCFn77qD81HOvCWecjgcDofDqe9Mo8UxVo6LA1wLlscSDofD4XA41Z0sRkjL95bpIyqIYTOHw+FwOJz6zkKcY8M9gkzjxpCZH3A4HA6HwyntBJHfSdwhMYJMw0iePoZf7+YQDofD4XA4xZwl6crEMocMbfH0WorD4XA4HE5dZ3kxcTvLr3tzXN62cTgcDofDqevc40bUFJIfDaPKm3QOh8PhcDiPcV7p072rO63HfTrAz3MIh8PhcDicEs6Uvtjn5hSrM+VxOBwOh8Op6uxq15XtH8/I4XA4HA6ntHPMFUPGd8P0ReO+92HzxeFwOBwOp7zThid9mfuvhQh7OW3K43A4HA6HU9eJHctyqpYPMD27luJwOBwOh/Mgp/Xnw7gxvaLIbzGOcR+Hw+FwOJzHOcf49WIIycSVD/Vq43A4HA6H8whnx+6SdnPI7igcDofD4XCKO1Otc0hO31XrR7lPxuFwOBwOp7TzT4vD4XA4HA6Hw+FwOBwOh8PhcDgcDofD4XA4HM5znS/lqLjLlQGH4gAAAABJRU5ErkJggg==",
  "expiration_time": "2019-02-25 10:50:00.507433116 UTC"
}
```




<div class="json-schema">

<p>Returns a JSON containing <code>login_token</code>, <code>qr_code</code> and <code>expiration_time</code>.</p>


<p>This object has the following properties:</p>

<h3> <code>login_token</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>qr_code</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>expiration_time</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

</div>

## Language Code
`(string, enum)`


<div class="json-schema">

<p>Currently supported language codes</p>


<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"da"</code></li>
<li><code>"de"</code></li>
<li><code>"el"</code></li>
<li><code>"en"</code></li>
<li><code>"es"</code></li>
<li><code>"et"</code></li>
<li><code>"fi"</code></li>
<li><code>"fr"</code></li>
<li><code>"is"</code></li>
<li><code>"it"</code></li>
<li><code>"lt"</code></li>
<li><code>"lv"</code></li>
<li><code>"nl"</code></li>
<li><code>"no"</code></li>
<li><code>"pt"</code></li>
<li><code>"sv"</code></li>

</ul>

</div>

## User
`(object)`

> ### Example JSON: for "User"

```json
{
  "id": "1",
  "fstname": "Arthur",
  "sndname": "Dent",
  "email": "arthur.dent@scrive.com",
  "twofactor_active": false,
  "twofactor_is_mandatory": false,
  "personalnumber": "197910124242",
  "phone": "+444242424242",
  "companyadmin": true,
  "companyposition": "Hitchhiker",
  "lang": "en"
}
```




<div class="json-schema">

<p>JSON representation of a User.</p>


<p>This object has the following properties:</p>

<h3> <code>id</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>fstname</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>sndname</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>email</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>sysauth</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>home_folder_id</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>twofactor_active</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>twofactor_is_mandatory</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>personalnumber</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>phone</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>companyadmin</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>companyposition</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>lang</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

</div>

## UserGroup
`(object)`

> ### Example JSON: for "UserGroup"

```json
{
  "id": "1",
  "parent_id": null,
  "name": "A Root Usergroup",
  "children": [
    {
      "id": "2",
      "name": "Some child user group"
    },
    {
      "id": "3",
      "name": "Yet another child user group"
    }
  ],
  "settings": {
    "inherited_from": null,
    "data_retention_policy": {
      "idle_doc_timeout_preparation": null,
      "idle_doc_timeout_closed": null,
      "idle_doc_timeout_canceled": 42,
      "idle_doc_timeout_timedout": null,
      "idle_doc_timeout_rejected": null,
      "idle_doc_timeout_error": null,
      "immediate_trash": false
    }
  },
  "contact_details": {
    "inherited_from": null,
    "address": {
      "company_number": "5568166804",
      "company_name": "Scrive",
      "address": "Grev Turegatan 11A",
      "zip": "114 46",
      "city": "Stockholm",
      "country": "Sweden"
    }
  },
  "tags": [
    {
      "name": "alignment",
      "value": "chaotic good"
    }
  ]
}
```




<div class="json-schema">

<p>JSON representation of a User Group.</p>


<p>This object has the following properties:</p>

<h3> <code>id</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>parent_id</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>name</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>children</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>id</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>name</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

</div>

</div>

<h3> <code>settings</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>JSON representation of a User Group's Settings.</p>


<p>The <code>settings</code> object has the following properties:</p>

<h4> <code>inherited_from</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>data_retention_policy</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>The <code>data_retention_policy</code> object has the following properties:</p>

<h5> <code>idle_doc_timeout_preparation</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after preparation</p>


</div>

<h5> <code>idle_doc_timeout_closed</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after closed</p>


</div>

<h5> <code>idle_doc_timeout_canceled</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after canceled</p>


</div>

<h5> <code>idle_doc_timeout_timedout</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after timedout</p>


</div>

<h5> <code>idle_doc_timeout_rejected</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after rejected</p>


</div>

<h5> <code>idle_doc_timeout_error</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after error</p>


</div>

<h5> <code>immediate_trash</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

</div>

</div>

</div>

<h3> <code>contact_details</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>JSON representation of a User Group's Contact Details.</p>


<p>The <code>contact_details</code> object has the following properties:</p>

<h4> <code>inherited_from</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>address</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>The <code>address</code> object has the following properties:</p>

<h5> <code>company_number</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>company_name</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>address</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>zip</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>city</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>country</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

</div>

</div>

<h3> <code>tags</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p><strong>User defined set of name/value pairs.</strong></p>
<p>Each tag must have <code>{&quot;name&quot;: &quot;some-name&quot;, &quot;value&quot;: &quot;some-value&quot;}</code> format.
In the responses value is always a string.
In the requests you can also provide <code>null</code> value to delete a tag.
Other value types lead to 400 Bad Request response.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>name</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>value</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

</div>

</div>

</div>

## UserGroupWithInheritable
`(object)`

> ### Example JSON: for "UserGroupWithInheritable"

```json
{
  "id": "5",
  "parent_id": "1",
  "name": "A Child Usergroup",
  "children": [
    {
      "id": "2",
      "name": "Some child user group"
    },
    {
      "id": "3",
      "name": "Yet another child user group"
    }
  ],
  "settings": {
    "inherited_from": null,
    "data_retention_policy": {
      "idle_doc_timeout_preparation": null,
      "idle_doc_timeout_closed": null,
      "idle_doc_timeout_canceled": 42,
      "idle_doc_timeout_timedout": null,
      "idle_doc_timeout_rejected": null,
      "idle_doc_timeout_error": null,
      "immediate_trash": false
    },
    "inheritable_preview": {
      "inherited_from": "1",
      "data_retention_policy": {
        "idle_doc_timeout_preparation": null,
        "idle_doc_timeout_closed": null,
        "idle_doc_timeout_canceled": null,
        "idle_doc_timeout_timedout": null,
        "idle_doc_timeout_rejected": 23,
        "idle_doc_timeout_error": null,
        "immediate_trash": true
      }
    }
  },
  "contact_details": {
    "inherited_from": "1",
    "address": {
      "company_number": "5568166804",
      "company_name": "Scrive",
      "address": "Grev Turegatan 11A",
      "zip": "114 46",
      "city": "Stockholm",
      "country": "Sweden"
    },
    "inheritable_preview": {
      "inherited_from": "1",
      "address": {
        "company_number": "5568166804",
        "company_name": "Scrive",
        "address": "Grev Turegatan 11A",
        "zip": "114 46",
        "city": "Stockholm",
        "country": "Sweden"
      }
    }
  },
  "tags": [
    {
      "name": "home-planet",
      "value": "Earth"
    }
  ]
}
```




<div class="json-schema">

<p>JSON representation of a User Group (with Inheritable Previews).</p>


<p>This object has the following properties:</p>

<h3> <code>id</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>parent_id</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>name</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>children</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>id</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>name</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

</div>

</div>

<h3> <code>settings</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>JSON representation of a User Group's Settings (with Inheritable Preview).</p>


<p>The <code>settings</code> object has the following properties:</p>

<h4> <code>inherited_from</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>data_retention_policy</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>The <code>data_retention_policy</code> object has the following properties:</p>

<h5> <code>idle_doc_timeout_preparation</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after preparation</p>


</div>

<h5> <code>idle_doc_timeout_closed</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after closed</p>


</div>

<h5> <code>idle_doc_timeout_canceled</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after canceled</p>


</div>

<h5> <code>idle_doc_timeout_timedout</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after timedout</p>


</div>

<h5> <code>idle_doc_timeout_rejected</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after rejected</p>


</div>

<h5> <code>idle_doc_timeout_error</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after error</p>


</div>

<h5> <code>immediate_trash</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

</div>

</div>

<h4> <code>inheritable_preview</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>The <code>inheritable_preview</code> object has the following properties:</p>

<h5> <code>inherited_from</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>data_retention_policy</code>  <code>(object)</code> </h5>



<div class="json-schema">

<p>The <code>data_retention_policy</code> object has the following properties:</p>

<h6> <code>idle_doc_timeout_preparation</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after preparation</p>


</div>

<h6> <code>idle_doc_timeout_closed</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after closed</p>


</div>

<h6> <code>idle_doc_timeout_canceled</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after canceled</p>


</div>

<h6> <code>idle_doc_timeout_timedout</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after timedout</p>


</div>

<h6> <code>idle_doc_timeout_rejected</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after rejected</p>


</div>

<h6> <code>idle_doc_timeout_error</code>  <code>(integer)</code> </h6>



<div class="json-schema">

<p>Number of days to retain the document after error</p>


</div>

<h6> <code>immediate_trash</code>  <code>(boolean)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

<h3> <code>contact_details</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>JSON representation of a User Group's Contact Details (with Inheritable
Preview).</p>


<p>The <code>contact_details</code> object has the following properties:</p>

<h4> <code>inherited_from</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>address</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>The <code>address</code> object has the following properties:</p>

<h5> <code>company_number</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>company_name</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>address</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>zip</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>city</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>country</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

</div>

<h4> <code>inheritable_preview</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>The <code>inheritable_preview</code> object has the following properties:</p>

<h5> <code>inherited_from</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>address</code>  <code>(object)</code> </h5>



<div class="json-schema">

<p>The <code>address</code> object has the following properties:</p>

<h6> <code>company_number</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>company_name</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>address</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>zip</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>city</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

<h6> <code>country</code>  <code>(string)</code> </h6>



<div class="json-schema">

</div>

</div>

</div>

</div>

<h3> <code>tags</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p><strong>User defined set of name/value pairs.</strong></p>
<p>Each tag must have <code>{&quot;name&quot;: &quot;some-name&quot;, &quot;value&quot;: &quot;some-value&quot;}</code> format.
In the responses value is always a string.
In the requests you can also provide <code>null</code> value to delete a tag.
Other value types lead to 400 Bad Request response.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h4> <code>(object)</code> </h4>



<div class="json-schema">

<p>This object has the following properties:</p>

<h5> <code>name</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>value</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

</div>

</div>

</div>

## UserGroupSettings
`(object)`

> ### Example JSON: for "UserGroupSettings"

```json
{
  "inherited_from": null,
  "data_retention_policy": {
    "idle_doc_timeout_preparation": null,
    "idle_doc_timeout_closed": null,
    "idle_doc_timeout_canceled": 42,
    "idle_doc_timeout_timedout": null,
    "idle_doc_timeout_rejected": null,
    "idle_doc_timeout_error": null,
    "immediate_trash": false
  }
}
```




<div class="json-schema">

<p>JSON representation of a User Group's Settings.</p>


<p>This object has the following properties:</p>

<h3> <code>inherited_from</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>data_retention_policy</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>The <code>data_retention_policy</code> object has the following properties:</p>

<h4> <code>idle_doc_timeout_preparation</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days to retain the document after preparation</p>


</div>

<h4> <code>idle_doc_timeout_closed</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days to retain the document after closed</p>


</div>

<h4> <code>idle_doc_timeout_canceled</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days to retain the document after canceled</p>


</div>

<h4> <code>idle_doc_timeout_timedout</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days to retain the document after timedout</p>


</div>

<h4> <code>idle_doc_timeout_rejected</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days to retain the document after rejected</p>


</div>

<h4> <code>idle_doc_timeout_error</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days to retain the document after error</p>


</div>

<h4> <code>immediate_trash</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

</div>

</div>

</div>

## UserGroupSettingsWithInheritable
`(object)`

> ### Example JSON: for "UserGroupSettingsWithInheritable"

```json
{
  "inherited_from": null,
  "data_retention_policy": {
    "idle_doc_timeout_preparation": null,
    "idle_doc_timeout_closed": null,
    "idle_doc_timeout_canceled": 42,
    "idle_doc_timeout_timedout": null,
    "idle_doc_timeout_rejected": null,
    "idle_doc_timeout_error": null,
    "immediate_trash": false
  },
  "inheritable_preview": {
    "inherited_from": 1,
    "data_retention_policy": {
      "idle_doc_timeout_preparation": null,
      "idle_doc_timeout_closed": null,
      "idle_doc_timeout_canceled": null,
      "idle_doc_timeout_timedout": null,
      "idle_doc_timeout_rejected": 23,
      "idle_doc_timeout_error": null,
      "immediate_trash": true
    }
  }
}
```




<div class="json-schema">

<p>JSON representation of a User Group's Settings (with Inheritable Preview).</p>


<p>This object has the following properties:</p>

<h3> <code>inherited_from</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>data_retention_policy</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>The <code>data_retention_policy</code> object has the following properties:</p>

<h4> <code>idle_doc_timeout_preparation</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days to retain the document after preparation</p>


</div>

<h4> <code>idle_doc_timeout_closed</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days to retain the document after closed</p>


</div>

<h4> <code>idle_doc_timeout_canceled</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days to retain the document after canceled</p>


</div>

<h4> <code>idle_doc_timeout_timedout</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days to retain the document after timedout</p>


</div>

<h4> <code>idle_doc_timeout_rejected</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days to retain the document after rejected</p>


</div>

<h4> <code>idle_doc_timeout_error</code>  <code>(integer)</code> </h4>



<div class="json-schema">

<p>Number of days to retain the document after error</p>


</div>

<h4> <code>immediate_trash</code>  <code>(boolean)</code> </h4>



<div class="json-schema">

</div>

</div>

<h3> <code>inheritable_preview</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>The <code>inheritable_preview</code> object has the following properties:</p>

<h4> <code>inherited_from</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>data_retention_policy</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>The <code>data_retention_policy</code> object has the following properties:</p>

<h5> <code>idle_doc_timeout_preparation</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after preparation</p>


</div>

<h5> <code>idle_doc_timeout_closed</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after closed</p>


</div>

<h5> <code>idle_doc_timeout_canceled</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after canceled</p>


</div>

<h5> <code>idle_doc_timeout_timedout</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after timedout</p>


</div>

<h5> <code>idle_doc_timeout_rejected</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after rejected</p>


</div>

<h5> <code>idle_doc_timeout_error</code>  <code>(integer)</code> </h5>



<div class="json-schema">

<p>Number of days to retain the document after error</p>


</div>

<h5> <code>immediate_trash</code>  <code>(boolean)</code> </h5>



<div class="json-schema">

</div>

</div>

</div>

</div>

## UserGroupContactDetails
`(object)`

> ### Example JSON: for "UserGroupContactDetails"

```json
{
  "inherited_from": null,
  "address": {
    "company_number": "5568166804",
    "company_name": "Scrive",
    "address": "Grev Turegatan 11A",
    "zip": "114 46",
    "city": "Stockholm",
    "country": "Sweden"
  }
}
```




<div class="json-schema">

<p>JSON representation of a User Group's Contact Details.</p>


<p>This object has the following properties:</p>

<h3> <code>inherited_from</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>address</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>The <code>address</code> object has the following properties:</p>

<h4> <code>company_number</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>company_name</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>address</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>zip</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>city</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>country</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

</div>

</div>

## UserGroupContactDetailsWithInheritable
`(object)`

> ### Example JSON: for "UserGroupContactDetailsWithInheritable"

```json
{
  "inherited_from": "1",
  "address": {
    "company_number": "5568166804",
    "company_name": "Scrive",
    "address": "Grev Turegatan 11A",
    "zip": "114 46",
    "city": "Stockholm",
    "country": "Sweden"
  },
  "inheritable_preview": {
    "inherited_from": "1",
    "address": {
      "company_number": "5568166804",
      "company_name": "Scrive",
      "address": "Grev Turegatan 11A",
      "zip": "114 46",
      "city": "Stockholm",
      "country": "Sweden"
    }
  }
}
```




<div class="json-schema">

<p>JSON representation of a User Group's Contact Details (with Inheritable
Preview).</p>


<p>This object has the following properties:</p>

<h3> <code>inherited_from</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>address</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>The <code>address</code> object has the following properties:</p>

<h4> <code>company_number</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>company_name</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>address</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>zip</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>city</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>country</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

</div>

<h3> <code>inheritable_preview</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>The <code>inheritable_preview</code> object has the following properties:</p>

<h4> <code>inherited_from</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>address</code>  <code>(object)</code> </h4>



<div class="json-schema">

<p>The <code>address</code> object has the following properties:</p>

<h5> <code>company_number</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>company_name</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>address</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>zip</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>city</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

<h5> <code>country</code>  <code>(string)</code> </h5>



<div class="json-schema">

</div>

</div>

</div>

</div>

## Tags
`(array)`

> ### Example JSON: for "Tags"

```json
[
  {
    "name": "founded",
    "value": "1846"
  },
  {
    "name": "status",
    "value": "busy"
  }
]
```




<div class="json-schema">

<p><strong>User defined set of name/value pairs.</strong></p>
<p>Each tag must have <code>{&quot;name&quot;: &quot;some-name&quot;, &quot;value&quot;: &quot;some-value&quot;}</code> format.
In the responses value is always a string.
In the requests you can also provide <code>null</code> value to delete a tag.
Other value types lead to 400 Bad Request response.</p>


<p>Default: <br/><code class="code-block">[]</code></p>

<p>All array elements must be of type:</p>

<h3> <code>(object)</code> </h3>



<div class="json-schema">

<p>This object has the following properties:</p>

<h4> <code>name</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

<h4> <code>value</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

</div>

</div>

## AccessRole
`(object)`

> ### Example JSON: for "AccessRole"

```json
{
  "id": "8",
  "is_generated": false,
  "role_type": "user_group_admin",
  "source": {
    "type": "user",
    "id": "2"
  },
  "target": {
    "type": "user_group",
    "id": "11"
  }
}
```




<div class="json-schema">

<p>JSON representation of an Access Role.</p>


<p>This object has the following properties:</p>

<h3> <code>id</code>  <code>(string)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>is_generated</code>  <code>(boolean)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>role_type</code>  <code>(string, enum)</code> </h3>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"user"</code></li>
<li><code>"user_group_member"</code></li>
<li><code>"user_admin"</code></li>
<li><code>"user_group_admin"</code></li>
<li><code>"document_admin"</code></li>

</ul>

</div>

<h3> <code>source</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>The <code>source</code> object has the following properties:</p>

<h4> <code>type</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"user"</code></li>
<li><code>"user_group"</code></li>

</ul>

</div>

<h4> <code>id</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

</div>

<h3> <code>target</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>The <code>target</code> object has the following properties:</p>

<h4> <code>type</code>  <code>(string, enum)</code> </h4>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"user"</code></li>
<li><code>"user_group"</code></li>
<li><code>"folder"</code></li>

</ul>

</div>

<h4> <code>id</code>  <code>(string)</code> </h4>



<div class="json-schema">

</div>

</div>

<h3> <code>allowed_actions</code>  <code>(object)</code> </h3>



<div class="json-schema">

<p>The <code>allowed_actions</code> object has the following properties:</p>

<h4> <code>document</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h5> <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"create"</code></li>
<li><code>"delete"</code></li>
<li><code>"read"</code></li>
<li><code>"update"</code></li>

</ul>

</div>

</div>

<h4> <code>folder_policy</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h5> <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"create"</code></li>
<li><code>"delete"</code></li>
<li><code>"read"</code></li>
<li><code>"update"</code></li>

</ul>

</div>

</div>

<h4> <code>user</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h5> <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"create"</code></li>
<li><code>"delete"</code></li>
<li><code>"read"</code></li>
<li><code>"update"</code></li>

</ul>

</div>

</div>

<h4> <code>user_group</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h5> <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"create"</code></li>
<li><code>"delete"</code></li>
<li><code>"read"</code></li>
<li><code>"update"</code></li>

</ul>

</div>

</div>

<h4> <code>user_group_policy</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h5> <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"create"</code></li>
<li><code>"delete"</code></li>
<li><code>"read"</code></li>
<li><code>"update"</code></li>

</ul>

</div>

</div>

<h4> <code>user_personal_token</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h5> <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"create"</code></li>
<li><code>"delete"</code></li>
<li><code>"read"</code></li>
<li><code>"update"</code></li>

</ul>

</div>

</div>

<h4> <code>user_policy</code>  <code>(array)</code> </h4>



<div class="json-schema">

<p>All array elements must be of type:</p>

<h5> <code>(string, enum)</code> </h5>



<div class="json-schema">

<p>The value of this property must be one of the following enum values:</p>

<ul>

<li><code>"create"</code></li>
<li><code>"delete"</code></li>
<li><code>"read"</code></li>
<li><code>"update"</code></li>

</ul>

</div>

</div>

</div>

</div>

## Folder
`(object)`

> ### Example JSON: for "Folder"

```json
{
  "id": "1",
  "name": "Root folder",
  "home_for_user": null,
  "home_for_user_group": "10",
  "parent_id": null,
  "children": [
    {
      "id": "2",
      "name": "Subfolder of 1",
      "home_for_user": "33",
      "home_for_user_group": null,
      "children": [
        {
          "id": "3",
          "name": "Subfolder of 2",
          "home_for_user": "44",
          "home_for_user_group": null
        }
      ]
    }
  ]
}
```




<div class="json-schema">

<p>JSON representation of a Folder.</p>


<p>This object has the following properties:</p>

<h3> <code>id</code>  <code>(string, required)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>name</code>  <code>(string, required)</code> </h3>



<div class="json-schema">

</div>

<h3> <code>home_for_user</code>  <code>(string)</code> </h3>



<div class="json-schema">

<p>If the folder is a home folder for a user this field contains the ID of that user. Otherwise it's null.</p>


</div>

<h3> <code>home_for_user_group</code>  <code>(string)</code> </h3>



<div class="json-schema">

<p>If the folder is a home folder for a user group this field contains the ID of that group. Otherwise it's null.</p>


</div>

<h3> <code>parent_id</code>  <code>(string)</code> </h3>



<div class="json-schema">

<p>Optional property. If present contains either the ID of the parent folder
or null if the requested folder is root.</p>


</div>

<h3> <code>children</code>  <code>(array)</code> </h3>



<div class="json-schema">

<p>Optional property. If present contains either the immediate children or all descendant folders.</p>


<p>All array elements must be of type:</p>

<h4> <code>(Folder)</code> </h4>



<div class="json-schema">

</div>

</div>

</div>


