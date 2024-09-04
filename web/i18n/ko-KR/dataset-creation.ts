const translation = {
  steps: {
    header: {
      creation: '지식 생성',
      update: '데이터 추가',
    },
    one: '데이터 소스 선택',
    two: '텍스트 전처리 및 클리닝',
    three: '실행 및 완료',
  },
  error: {
    unavailable: '이 지식은 사용할 수 없습니다',
  },
  stepOne: {
    filePreview: '파일 미리보기',
    pagePreview: '페이지 미리보기',
    dataSourceType: {
      file: '텍스트 파일에서 가져오기',
      notion: 'Notion 동기화',
      web: '웹 사이트 동기화',
    },
    uploader: {
      title: '텍스트 파일 업로드',
      button: '파일을 끌어다 놓거나',
      browse: '찾아보기',
      tip: '{{supportTypes}}을(를) 지원합니다. 파일당 최대 크기는 {{size}}MB입니다.',
      validation: {
        typeError: '지원되지 않는 파일 유형입니다',
        size: '파일 크기가 너무 큽니다. 최대 크기는 {{size}}MB입니다',
        count: '여러 파일은 지원되지 않습니다',
        filesNumber: '일괄 업로드 제한({{filesNumber}}개)에 도달했습니다.',
      },
      cancel: '취소',
      change: '변경',
      failed: '업로드에 실패했습니다',
    },
    notionSyncTitle: 'Notion에 연결되지 않았습니다',
    notionSyncTip: 'Notion과 동기화하려면 먼저 Notion에 연결해야 합니다.',
    connect: '연결하기',
    button: '다음',
    emptyDatasetCreation: '비어있는 지식 생성',
    modal: {
      title: '비어있는 지식 생성',
      tip: '비어있는 지식에는 문서가 포함되지 않으며 언제든지 문서를 업로드할 수 있습니다.',
      input: '지식 이름',
      placeholder: '입력하세요',
      nameNotEmpty: '이름은 비워둘 수 없습니다',
      nameLengthInvaild: '이름은 1~40자여야 합니다',
      cancelButton: '취소',
      confirmButton: '생성',
      failed: '생성에 실패했습니다',
    },
    website: {
      firecrawlDocLink: 'https://docs.dify.ai/guides/knowledge-base/sync-from-website',
      limit: '한계',
      options: '옵션',
      firecrawlDoc: 'Firecrawl 문서',
      selectAll: '모두 선택',
      maxDepth: '최대 수심',
      includeOnlyPaths: '경로만 포함',
      excludePaths: '경로 제외',
      preview: '미리 보기',
      run: '달리다',
      fireCrawlNotConfigured: 'Firecrawl이 구성되지 않았습니다.',
      firecrawlTitle: 'Firecrawl로 🔥웹 콘텐츠 추출',
      configure: '구성',
      resetAll: '모두 재설정',
      crawlSubPage: '하위 페이지 크롤링',
      exceptionErrorTitle: 'Firecrawl 작업을 실행하는 동안 예외가 발생했습니다.',
      scrapTimeInfo: '{{time}}s 내에 총 {{total}} 페이지를 스크랩했습니다.',
      unknownError: '알 수 없는 오류',
      totalPageScraped: '스크랩한 총 페이지 수:',
      fireCrawlNotConfiguredDescription: 'API 키로 Firecrawl을 구성하여 사용합니다.',
      extractOnlyMainContent: '기본 콘텐츠만 추출합니다(머리글, 탐색, 바닥글 등 없음).',
      maxDepthTooltip: '입력한 URL을 기준으로 크롤링할 최대 수준입니다. 깊이 0은 입력 된 url의 페이지를 긁어 내고, 깊이 1은 url과 enteredURL + one / 이후의 모든 것을 긁어 모으는 식입니다.',
    },
  },
  stepTwo: {
    segmentation: '청크 설정',
    auto: '자동',
    autoDescription: '청크 및 전처리 규칙을 자동으로 설정합니다. 처음 사용자는 이 옵션을 선택하는 것을 권장합니다.',
    custom: '사용자 설정',
    customDescription: '청크 규칙, 청크 길이, 전처리 규칙 등을 사용자 정의합니다.',
    separator: '세그먼트 식별자',
    separatorPlaceholder: '예: 줄바꿈(\\\\n) 또는 특수 구분자(예: "***")',
    maxLength: '최대 청크 길이',
    overlap: '청크 중첩',
    overlapTip: '청크 중첩을 설정하여 그 사이의 의미적 연관성을 유지하고 검색 효과를 향상시킬 수 있습니다. 최대 청크 크기의 10%~25%로 설정하는 것이 좋습니다.',
    overlapCheck: '청크 중첩은 최대 청크 길이를 초과할 수 없습니다',
    rules: '텍스트 전처리 규칙',
    removeExtraSpaces: '연속된 공백, 줄바꿈, 탭을 대체합니다',
    removeUrlEmails: '모든 URL과 이메일 주소를 제거합니다',
    removeStopwords: '일반적인 불용어(예: "a", "an", "the" 등)를 제거합니다',
    preview: '미리보기',
    reset: '초기화',
    indexMode: '인덱스 모드',
    qualified: '고품질',
    recommend: '추천',
    qualifiedTip: '사용자 쿼리에 대해 더 높은 정확성을 제공하기 위해 기본 시스템 임베딩 인터페이스를 호출하여 처리합니다.',
    warning: '모델 제공자의 API 키를 설정하세요.',
    click: '설정으로 이동',
    economical: '경제적',
    economicalTip: '오프라인 벡터 엔진, 키워드 인덱스 등을 사용하여 토큰 소비 없이 정확도를 낮춥니다.',
    QATitle: '질문과 답변 형식으로 세그먼트화',
    QATip: '이 옵션을 활성화하면 추가 토큰이 소비됩니다',
    QALanguage: '사용 언어',
    emstimateCost: '예상 비용',
    emstimateSegment: '예상 청크 수',
    segmentCount: '청크',
    calculating: '계산 중...',
    fileSource: '문서 전처리',
    notionSource: '페이지 전처리',
    other: '기타',
    fileUnit: '파일',
    notionUnit: '페이지',
    previousStep: '이전 단계',
    nextStep: '저장하고 처리',
    save: '저장하고 처리',
    cancel: '취소',
    sideTipTitle: '청크와 전처리가 필요한 이유',
    sideTipP1: '텍스트 데이터를 처리할 때 청크와 클리닝은 두 가지 중요한 전처리 단계입니다.',
    sideTipP2: '세그멘테이션은 긴 텍스트를 단락으로 분할하여 모델이 이해하기 쉽게 합니다. 이로 인해 모델 결과의 품질과 관련성이 향상됩니다.',
    sideTipP3: '클리닝은 불필요한 문자 및 형식을 제거하여 지식을 더 깔끔하고 분석 가능한 것으로 만듭니다.',
    sideTipP4: '적절한 청크와 클리닝은 모델의 성능을 향상시키고 정확하고 가치 있는 결과를 제공합니다.',
    previewTitle: '미리보기',
    previewTitleButton: '미리보기',
    previewButton: '질문-답변 형식으로 전환',
    previewSwitchTipStart: '현재 청크 미리보기는 텍스트 형식입니다. 질문과 답변 형식 미리보기로 전환하면',
    previewSwitchTipEnd: ' 추가 토큰이 소비됩니다',
    characters: '문자',
    indexSettedTip: '인덱스 방식을 변경하려면,',
    retrivalSettedTip: '인덱스 방식을 변경하려면,',
    datasetSettingLink: '지식 설정',
    webpageUnit: '페이지',
    websiteSource: '웹 사이트 전처리',
  },
  stepThree: {
    creationTitle: '🎉 지식이 생성되었습니다',
    creationContent: '지식 이름이 자동으로 설정되었지만 언제든지 변경할 수 있습니다',
    label: '지식 이름',
    additionTitle: '🎉 문서가 업로드되었습니다',
    additionP1: '문서가 지식에 업로드되었습니다',
    additionP2: '지식의 문서 목록에서 찾을 수 있습니다.',
    stop: '처리 중지',
    resume: '처리 재개',
    navTo: '문서로 이동',
    sideTipTitle: '다음 단계는 무엇인가요',
    sideTipContent:
      '문서 인덱싱이 완료되면 지식을 응용 프로그램 컨텍스트로 통합할 수 있습니다. 프롬프트 오케스트레이션 페이지에서 컨텍스트 설정을 찾을 수 있습니다. 또한 독립된 ChatGPT 인덱스 플러그인으로 출시할 수도 있습니다.',
    modelTitle: '임베딩을 중지해도 괜찮습니까?',
    modelContent: '나중에 처리를 다시 시작해야 할 경우, 중단한 위치에서 계속합니다.',
    modelButtonConfirm: '확인',
    modelButtonCancel: '취소',
  },
  firecrawl: {
    getApiKeyLinkText: 'firecrawl.dev 에서 API 키 가져오기',
    apiKeyPlaceholder: 'firecrawl.dev 의 API 키',
    configFirecrawl: 'Firecrawl 구성 🔥',
  },
}

export default translation
