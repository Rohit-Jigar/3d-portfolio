import logging
from typing import List
from fastapi import APIRouter, Query
from backend.app.database import get_all_inquiries, get_inquiry_stats
from backend.app.schemas import InquiryRecord, InquiryStatsResponse

logger = logging.getLogger("portfolio.inquiries")
router = APIRouter(prefix="/api/inquiries", tags=["Inquiries"])


@router.get("", response_model=List[InquiryRecord])
@router.get("/", response_model=List[InquiryRecord], include_in_schema=False)
def get_inquiries(
    limit: int = Query(default=100, ge=1, le=500, description="Maximum number of inquiries to retrieve"),
    offset: int = Query(default=0, ge=0, description="Offset for pagination")
):
    """
    Retrieves recent inquiries ordered by newest first.
    """
    logger.info("Fetching inquiries (limit=%d, offset=%d)", limit, offset)
    return get_all_inquiries(limit=limit, offset=offset)


@router.get("/stats", response_model=InquiryStatsResponse)
def get_stats():
    """
    Retrieves inquiry statistics, counts, status breakdowns, and metrics.
    """
    logger.info("Fetching inquiry statistics")
    return get_inquiry_stats()
