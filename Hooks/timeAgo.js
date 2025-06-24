export  const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);
  
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  
    const units = [
      { name: 'second', value: 60 },
      { name: 'minute', value: 60 },
      { name: 'hour', value: 24 },
      { name: 'day', value: 30 },
      { name: 'month', value: 12 },
      { name: 'year', value: Infinity }
    ];
  
    let unit = 'second';
    let divisor = 1;
  
    for (let i = 0; i < units.length; i++) {
      const { name, value } = units[i];
      if (seconds < value) {
        break;
      }
      unit = name;
      divisor = value;
    }
  
    const delta = Math.floor(seconds / divisor);
    return rtf.format(delta, unit);
  };
  