export function HttpService(options = null) {
  var _options = _getOptions(options);

  this.get = function (url, data) {
    return _ajaxRequest(url, data, 'GET');
  }

  this.post = function (url, data) {
    return _ajaxRequest(url, data, 'POST');
  }

  this.delete = function (url, data) {
    return _ajaxRequest(url, data, 'DELETE');
  }

  this.patch = function (url, data) {
    return _ajaxRequest(url, data, 'PATCH');
  }

  this.put = function (url, data) {
    return _ajaxRequest(url, data, 'PUT');
  }

  this.setOptions = function (options) {
    _options = _getOptions(options);
  }

  this.setStateRequestFunctions = function (success, error, complete) {
    _options.stateFunctions.success = success;
    _options.stateFunctions.error = error;
    _options.stateFunctions.complete = complete;
  }

  function _ajaxRequest(url, data, httpType) {
    return $.ajax({
      type: httpType,
      url: url,
      data: data,
      processData: _options.processData,
      contentType: _options.contentType,
      beforeSend: function (xhr) {
        for (let key of Object.keys(_options.headers)) {
          xhr.setRequestHeader(key, _options.headers[key]);
        }
      },
      success: _options.stateFunctions.success,
      error: _options.stateFunctions.error,
      complete: _options.stateFunctions.complete
    });
  }

  function _getOptions(options) {
    if (!options) {
      options = {};
    }

    return {
      async: options.async || true,
      headers: options.headers || {},
      processData: options.processData || true,
      contentType: options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
      stateFunctions: {
        success: options.success || null,
        error: options.error || null,
        complete: options.complete || null
      }
    }
  }
}